import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { UserService } from '../modules/user/user.service'
import { Public } from '../core/decorator/public.decorator'
import { empty, formatJsonApiResponse } from 'src/core/helpers'
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common'

const RESPONSE_TYPE = 'auth'

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() data: RegisterDto) {
    const user = await this.userService.findOneByEmail(data.email)

    if (user) {
      throw new BadRequestException("Email already exists")
    }

    const hashedPassword = await bcryptjs.hash(data.password, 10)

    const currentUser = Object.assign(data, {
      password: hashedPassword,
      organization_id: 1,
    })

    const savedUser = await this.userService.create(currentUser)

    const payload = { sub: savedUser.id, email: currentUser.email }
    const token = await this.jwtService.signAsync(payload)
    
    return formatJsonApiResponse(savedUser, RESPONSE_TYPE, {
      token,
      expires_in: 0,
    })
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email)

    if (empty(user)) {
      throw new UnauthorizedException("Invalid email or password")
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password")
    }

    const payload = { sub: user.id, email: user.email }
    const token = await this.jwtService.signAsync(payload)

    const currentUser = Object.assign(user, { password: undefined })

    return formatJsonApiResponse(currentUser, RESPONSE_TYPE, {
      token,
      expires_in: 0,
    })
  }
}

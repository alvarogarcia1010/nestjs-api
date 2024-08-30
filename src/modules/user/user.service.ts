import { Repository } from 'typeorm'
import { User } from './user.entity'
import { UserDto } from './user.dto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository:Repository<User>) {}

  async create(createUser: UserDto) {
    const newUser = this.userRepository.create(createUser)
    const saveUser = await this.userRepository.save(newUser)

    return {
      ...saveUser,
      password: undefined,
    }
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email })
  }
}

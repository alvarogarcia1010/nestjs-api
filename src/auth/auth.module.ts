import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { AuthService } from './auth.service'
import appConfig from 'src/core/utils/app-config'
import { UserModule } from 'src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthGuard } from 'src/core/guards/auth.guard'

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: appConfig().appSecret,
        signOptions: { expiresIn: '1d' },
        global: true,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AuthModule {}

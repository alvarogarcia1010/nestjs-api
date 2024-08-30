import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './auth/auth.module'
import { BaptismModule } from './modules/baptism/baptism.module'
import { MarriageModule } from './modules/marriage/marriage.module'
import { ConfirmationModule } from './modules/confirmation/confirmation.module'
import { JsonApiExceptionFilter } from './core/utils/json-api-exception.filter'

import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + './database/migrations/*{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
        extra: {
          charset: 'utf8mb4_unicode_ci',
        }
      }),
    }),
    UserModule,
    AuthModule,
    BaptismModule,
    MarriageModule,
    ConfirmationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: JsonApiExceptionFilter,
    },
  ],
})
export class AppModule {}

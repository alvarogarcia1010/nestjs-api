import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { BaptismModule } from './baptism/baptism.module'
import { ConfirmationModule } from './confirmation/confirmation.module'
import { JsonApiExceptionFilter } from './core/utils/json-api-exception.filter'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootpassword',
      database: 'parish_register_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BaptismModule,
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

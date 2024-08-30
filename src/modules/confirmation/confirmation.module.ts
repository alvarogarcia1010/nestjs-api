import { Module } from '@nestjs/common'
import { Confirmation } from './confirmation.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfirmationService } from './confirmation.service'
import { ConfirmationController } from './confirmation.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Confirmation])],
  controllers: [ConfirmationController],
  providers: [ConfirmationService],
})
export class ConfirmationModule {}

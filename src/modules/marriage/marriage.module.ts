import { Module } from '@nestjs/common'
import { Marriage } from './marriage.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MarriageService } from './marriage.service'
import { MarriageController } from './marriage.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Marriage])],
  controllers: [MarriageController],
  providers: [MarriageService],
})

export class MarriageModule {}

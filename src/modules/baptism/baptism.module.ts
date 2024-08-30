import { Module } from '@nestjs/common'
import { Baptism } from './baptism.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BaptismService } from './baptism.service'
import { BaptismController } from './baptism.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Baptism])],
  controllers: [BaptismController],
  providers: [BaptismService],
})
export class BaptismModule {}

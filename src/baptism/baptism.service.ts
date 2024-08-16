import { Repository } from 'typeorm'
import { BaptismDto } from './baptism.dto'
import { Baptism } from './baptism.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class BaptismService {

  constructor(@InjectRepository(Baptism) private baptismRepository:Repository<Baptism>) {}

  create(createBaptism: BaptismDto) {
    const newBaptism = this.baptismRepository.create(createBaptism)
    return this.baptismRepository.save(newBaptism)
  }

  findAll() {
    return this.baptismRepository.find()
  }

  findOne(id: number) {
    return this.baptismRepository.findOne({
      where: { id }
    })
  }

  update(id: number, updateBaptism: BaptismDto) {
    return this.baptismRepository.update({ id }, updateBaptism)
  }

  remove(id: number) {
    return this.baptismRepository.delete({ id })
  }
}

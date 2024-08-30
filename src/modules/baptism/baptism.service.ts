import { Repository } from 'typeorm'
import { BaptismDto } from './baptism.dto'
import { Baptism } from './baptism.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { empty } from 'src/core/helpers'

@Injectable()
export class BaptismService {

  constructor(@InjectRepository(Baptism) private baptismRepository:Repository<Baptism>) {}

  create(createBaptism: BaptismDto) {
    const newBaptism = this.baptismRepository.create(createBaptism)
    return this.baptismRepository.save(newBaptism)
  }

  async findAll(pageSize = null, pageNumber = null, searchWord = null, sortColumn = null, sortOrder = null) {

    const query = this.baptismRepository.createQueryBuilder('baptisms')

    if (!empty(searchWord)) {
      ['name', 'father_name', 'mother_name', 'godfather_name', 'godmother_name'].forEach((field) => {
        query.orWhere(`LOWER(${field}) LIKE :name`, { name: `%${searchWord?.toLowerCase()}%` })
      })
    }

    if (!empty(sortColumn) && !empty(sortOrder)) {
      query.orderBy(sortColumn, sortOrder)
    }

    if (!empty(pageNumber)) {
      const limit = (pageNumber - 1) * pageSize
      query.skip(limit)
    }

    if (!empty(pageSize)) {
      query.take(pageSize)
    }

    const [data, total] = await query.getManyAndCount()

    return {
      data,
      total,
    }
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

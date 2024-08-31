import { Repository } from 'typeorm'
import { MarriageDto } from './marriage.dto'
import { Marriage } from './marriage.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { empty } from '../../core/helpers'

@Injectable()
export class MarriageService {

  constructor(@InjectRepository(Marriage) private marriageRepository:Repository<Marriage>) {}

  create(createMarriage: MarriageDto) {
    const newMarriage = this.marriageRepository.create(createMarriage)
    return this.marriageRepository.save(newMarriage)
  }

  async findAll(pageSize = null, pageNumber = null, searchWord = null, sortColumn = null, sortOrder = null) {

    const query = this.marriageRepository.createQueryBuilder('marriages')

    if (!empty(searchWord)) {
      ['husband_name', 'wife_name', 'husband_father', 'husband_mother', 'wife_father', 'wife_mother'].forEach((field) => {
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
    return this.marriageRepository.findOne({
      where: { id }
    })
  }

  update(id: number, updateMarriage: MarriageDto) {
    return this.marriageRepository.update({ id }, updateMarriage)
  }

  remove(id: number) {
    return this.marriageRepository.delete({ id })
  }
}

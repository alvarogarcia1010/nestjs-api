import { Repository } from 'typeorm'
import { ConfirmationDto } from './confirmation.dto'
import { Confirmation } from './confirmation.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { empty } from 'src/core/helpers'

@Injectable()
export class ConfirmationService {

  constructor(@InjectRepository(Confirmation) private confirmationRepository:Repository<Confirmation>) {}

  create(createConfirmation: ConfirmationDto) {
    const newConfirmation = this.confirmationRepository.create(createConfirmation)
    return this.confirmationRepository.save(newConfirmation)
  }

  async findAll(pageSize = null, pageNumber = null, searchWord = null, sortColumn = null, sortOrder = null) {

    const query = this.confirmationRepository.createQueryBuilder('confirmation')

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
    return this.confirmationRepository.findOne({
      where: { id }
    })
  }

  update(id: number, updateConfirmation: ConfirmationDto) {
    return this.confirmationRepository.update({ id }, updateConfirmation)
  }

  remove(id: number) {
    return this.confirmationRepository.delete({ id })
  }
}

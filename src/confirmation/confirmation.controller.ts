import { ConfirmationDto } from './confirmation.dto'
import { ConfirmationService } from './confirmation.service'
import { empty, formatJsonApiResponse } from 'src/core/helpers'
import { JsonApiBodyDto } from 'src/core/dto/json-api-body.dto'
import { PaginationAndSearchQueryDto } from 'src/core/dto/pagination-and-search-query.dto'
import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, HttpException, Query } from '@nestjs/common'

const RESPONSE_TYPE = 'confirmations'

@Controller('confirmations')
export class ConfirmationController {
  constructor(private readonly ConfirmationService: ConfirmationService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationAndSearchQueryDto) {
    const { pageNumber, pageSize, search, sortColumn, sortOrder } = paginationQuery;

    const response = await this.ConfirmationService.findAll(pageSize, pageNumber, search, sortColumn, sortOrder)

    return formatJsonApiResponse(response.data, RESPONSE_TYPE, {
      totalPages: Math.ceil(response.total / pageSize),
      totalItems: response.total,
      currentPage: +pageNumber,
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const baptism = await this.ConfirmationService.findOne(+id)

    if (!baptism) {
      throw new NotFoundException(`The requested resource with ID '${id}' was not found.`);
    }

    return formatJsonApiResponse(baptism, RESPONSE_TYPE)
  }

  @Post()
  async create(@Body() data: JsonApiBodyDto<ConfirmationDto>) {
    const currentBaptism = { 
      ...data.data.attributes,
      organization_id: 1,
    }
  
    const savedBaptism = await this.ConfirmationService.create(currentBaptism)
    return formatJsonApiResponse(savedBaptism, RESPONSE_TYPE)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: JsonApiBodyDto<ConfirmationDto>) {
    const baptism = await this.ConfirmationService.findOne(+id)

    if (!baptism) {
      throw new NotFoundException(`The requested resource with ID '${id}' was not found.`);
    }

    const updatedData = {
      ...data.data.attributes,
    }

    const response = await this.ConfirmationService.update(+id, updatedData)

    if (empty(response.affected)) {
      throw new HttpException('Internal Server Error', 500);
    }

    const updatedBaptism = Object.assign(baptism, data)
    return formatJsonApiResponse(updatedBaptism, RESPONSE_TYPE)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.ConfirmationService.remove(+id)

    if (empty(response.affected)) {
      throw new NotFoundException(`The requested resource with ID '${id}' was not found.`);
    }

    return formatJsonApiResponse(null, RESPONSE_TYPE, {
      success: true,
    })
  }
}

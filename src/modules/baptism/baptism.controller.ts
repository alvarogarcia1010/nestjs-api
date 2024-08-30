import { BaptismDto } from './baptism.dto'
import { BaptismService } from './baptism.service'
import { empty, formatJsonApiResponse } from 'src/core/helpers'
import { JsonApiBodyDto } from 'src/core/dto/json-api-body.dto'
import { PaginationAndSearchQueryDto } from 'src/core/dto/pagination-and-search-query.dto'
import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, HttpException, Query } from '@nestjs/common'

const RESPONSE_TYPE = 'baptisms'

@Controller('baptisms')
export class BaptismController {
  constructor(private readonly baptismService: BaptismService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationAndSearchQueryDto) {
    const { pageNumber, pageSize, search, sortColumn, sortOrder } = paginationQuery;

    const response = await this.baptismService.findAll(pageSize, pageNumber, search, sortColumn, sortOrder)

    return formatJsonApiResponse(response.data, RESPONSE_TYPE, {
      totalPages: Math.ceil(response.total / pageSize),
      totalItems: response.total,
      currentPage: +pageNumber,
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const baptism = await this.baptismService.findOne(+id)

    if (!baptism) {
      throw new NotFoundException(`The requested resource with ID '${id}' was not found.`);
    }

    return formatJsonApiResponse(baptism, RESPONSE_TYPE)
  }

  @Post()
  async create(@Body() data: JsonApiBodyDto<BaptismDto>) {
    const currentBaptism = { 
      ...data.data.attributes,
      organization_id: 1,
    }
  
    const savedBaptism = await this.baptismService.create(currentBaptism)
    return formatJsonApiResponse(savedBaptism, RESPONSE_TYPE)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: JsonApiBodyDto<BaptismDto>) {
    const baptism = await this.baptismService.findOne(+id)

    if (!baptism) {
      throw new NotFoundException(`The requested resource with ID '${id}' was not found.`);
    }

    const updatedData = {
      ...data.data.attributes,
    }

    const response = await this.baptismService.update(+id, updatedData)

    if (empty(response.affected)) {
      throw new HttpException('Internal Server Error', 500);
    }

    const updatedBaptism = Object.assign(baptism, data)
    return formatJsonApiResponse(updatedBaptism, RESPONSE_TYPE)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.baptismService.remove(+id)

    if (empty(response.affected)) {
      throw new NotFoundException(`The requested resource with ID '${id}' was not found.`);
    }

    return formatJsonApiResponse(null, RESPONSE_TYPE, {
      success: true,
    })
  }
}

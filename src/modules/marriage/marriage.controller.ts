import { MarriageDto } from './marriage.dto'
import { MarriageService } from './marriage.service'
import { empty, formatJsonApiResponse } from 'src/core/helpers'
import { JsonApiBodyDto } from 'src/core/dto/json-api-body.dto'
import { PaginationAndSearchQueryDto } from 'src/core/dto/pagination-and-search-query.dto'
import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, HttpException, Query } from '@nestjs/common'

const RESPONSE_TYPE = 'marriages'

@Controller('marriages')
export class MarriageController {
  constructor(private readonly marriageService: MarriageService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationAndSearchQueryDto) {
    const { pageNumber, pageSize, search, sortColumn, sortOrder } = paginationQuery;

    const response = await this.marriageService.findAll(pageSize, pageNumber, search, sortColumn, sortOrder)

    return formatJsonApiResponse(response.data, RESPONSE_TYPE, {
      totalPages: Math.ceil(response.total / pageSize),
      totalItems: response.total,
      currentPage: +pageNumber,
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const marriage = await this.marriageService.findOne(+id)

    if (!marriage) {
      throw new NotFoundException(`The requested resource with ID '${id}' was not found.`);
    }

    return formatJsonApiResponse(marriage, RESPONSE_TYPE)
  }

  @Post()
  async create(@Body() data: JsonApiBodyDto<MarriageDto>) {
    const currentMarriage = { 
      ...data.data.attributes,
      organization_id: 1,
    }
  
    const savedMarriage = await this.marriageService.create(currentMarriage)
    return formatJsonApiResponse(savedMarriage, RESPONSE_TYPE)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: JsonApiBodyDto<MarriageDto>) {
    const marriage = await this.marriageService.findOne(+id)

    if (!marriage) {
      throw new NotFoundException(`The requested resource with ID '${id}' was not found.`);
    }

    const updatedData = {
      ...data.data.attributes,
    }

    const response = await this.marriageService.update(+id, updatedData)

    if (empty(response.affected)) {
      throw new HttpException('Internal Server Error', 500);
    }

    const updatedMarriage = Object.assign(marriage, data)
    return formatJsonApiResponse(updatedMarriage, RESPONSE_TYPE)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.marriageService.remove(+id)

    if (empty(response.affected)) {
      throw new NotFoundException(`The requested resource with ID '${id}' was not found.`);
    }

    return formatJsonApiResponse(null, RESPONSE_TYPE, {
      success: true,
    })
  }
}

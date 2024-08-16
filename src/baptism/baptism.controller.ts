import { BaptismDto } from './baptism.dto'
import { BaptismService } from './baptism.service'
import { empty, formatJsonApiResponse } from 'src/core/helpers'
import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, HttpException } from '@nestjs/common'

const RESPONSE_TYPE = 'baptisms'

@Controller('baptisms')
export class BaptismController {
  constructor(private readonly baptismService: BaptismService) {}

  @Get()
  async findAll() {
    const data = await this.baptismService.findAll()

    return formatJsonApiResponse(data, RESPONSE_TYPE)
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
  async create(@Body() data: BaptismDto) {
    const currentBaptism = Object.assign(data, { organization_id: 1 })
    const savedBaptism = await this.baptismService.create(currentBaptism)
    return formatJsonApiResponse(savedBaptism, RESPONSE_TYPE)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: BaptismDto) {
    const baptism = await this.baptismService.findOne(+id)

    if (!baptism) {
      throw new NotFoundException(`The requested resource with ID '${id}' was not found.`);
    }

    const response = await this.baptismService.update(+id, data)

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

    return formatJsonApiResponse(null, RESPONSE_TYPE)
  }
}

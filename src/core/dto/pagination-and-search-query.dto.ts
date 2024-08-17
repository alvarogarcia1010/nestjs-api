import { Type } from 'class-transformer'
import { IsOptional, IsInt, Min, IsString } from 'class-validator'

export class PaginationAndSearchQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  pageNumber?: number = 1

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  pageSize?: number = 10

  @IsOptional()
  @IsString()
  search?: string


  @IsOptional()
  @IsString()
  sortColumn?: string


  @IsOptional()
  @IsString()
  sortOrder?: string
}
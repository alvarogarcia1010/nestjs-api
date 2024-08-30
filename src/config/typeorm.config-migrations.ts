import { DataSource, DataSourceOptions } from 'typeorm'
import { typeOrmConfig } from './typeorm.config'

export = new DataSource(typeOrmConfig as DataSourceOptions) 
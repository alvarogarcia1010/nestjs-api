import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig({ path: '.env' })


export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // migrations: [__dirname + './src/database/migrations/*{.ts,.js}'],
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/database/migrations/*{.js,.ts}"],
  autoLoadEntities: true,
  synchronize: false,
  logging: true,
  extra: {
    charset: 'utf8mb4_unicode_ci',
  }
}
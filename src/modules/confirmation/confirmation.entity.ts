import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('confirmations')
export class Confirmation {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  book_number: number

  @Column({ nullable: true })
  folio_number: number

  @Column({ nullable: true })
  record_number: number

  @Column({ nullable: true })
  date: Date

  @Column()
  name: string

  @Column({ type: 'enum', enum: ['M', 'F'] })
  gender: string

  @Column()
  birth_date: Date

  @Column({ nullable: true })
  father_name: string

  @Column({ nullable: true })
  mother_name: string

  @Column({ nullable: true })
  godfather_name: string

  @Column({ nullable: true })
  godmother_name: string

  @Column()
  organization_id: number

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}

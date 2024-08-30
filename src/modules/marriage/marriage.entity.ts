import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('marriages')
export class Marriage {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: Date

  @Column({ nullable: true })
  book_start: number

  @Column({ nullable: true })
  book_end: number

  @Column()
  husband_name: string

  @Column()
  husband_age: number

  @Column({ nullable: true })
  husband_father: string

  @Column({ nullable: true })
  husband_mother: string

  @Column({ nullable: true })
  husband_birthplace: string

  @Column({ nullable: true })
  husband_address: string

  @Column()
  wife_name: string

  @Column()
  wife_age: number

  @Column({ nullable: true })
  wife_father: string

  @Column({ nullable: true })
  wife_mother: string

  @Column({ nullable: true })
  wife_birthplace: string

  @Column({ nullable: true })
  wife_address: string

  @Column()
  organization_id: number

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}

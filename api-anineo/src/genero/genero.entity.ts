import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  nombre: string;

  @Column('text')
  descripcion: string;

}
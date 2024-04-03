import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'generos'})
export class Genero{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    nombre: string

    @Column({nullable: true})
    descripcion: string
}
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'usuarios'})
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    nombre: string

    @Column()
    contraseña: string

    @Column()
    correo: string

    @Column()
    administrador: boolean
}
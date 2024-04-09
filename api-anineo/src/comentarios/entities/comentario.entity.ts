import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'comentarios'})
export class Comentario {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    anime: number

    @Column()
    usuario: number

    @Column()
    tipo: boolean

    @Column()
    comentario: string
}

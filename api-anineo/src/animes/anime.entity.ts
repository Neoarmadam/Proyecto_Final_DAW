import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'animes'})
export class Anime {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    nombre: string

    @Column({nullable: true})
    descripcion: string

    @Column()
    enEmision: boolean

    @Column()
    anio: number

    @Column()
    imagen: string

    @Column()
    genero: number;
}

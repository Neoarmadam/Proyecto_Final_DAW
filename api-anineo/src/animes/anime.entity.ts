import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Genero } from "src/generos/genero.entity";

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

    @ManyToOne(() => Genero, genero => genero.anime)
    genero: Genero;
}

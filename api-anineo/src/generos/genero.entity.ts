import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Anime } from "src/animes/anime.entity";

@Entity({name: 'generos'})
export class Genero{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    nombre: string

    @Column({nullable: true})
    descripcion: string

    @OneToMany(() => Anime, anime => anime.genero)
    anime: Anime[];
}
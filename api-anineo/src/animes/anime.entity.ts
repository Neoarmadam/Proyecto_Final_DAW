import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * Entidad Anime.
 */
@Entity({name: 'animes'})
export class Anime {

    /**
     * Identificador Autonumerico.
     */
    @PrimaryGeneratedColumn()
    id: number

    /**
     * Nombre del Anime.
     */
    @Column({unique: true})
    nombre: string

    /**
     * Descripcion del Anime.
     */
    @Column({nullable: true})
    descripcion: string

    /**
     * Boleano de si esta en emision.
     */
    @Column()
    enEmision: boolean

    /**
     * Año de lanzamiento del anime.
     */
    @Column()
    anio: number

    /**
     * Direccion URL del anime.
     */
    @Column()
    imagen: string

    /**
     * ID del genero al que pertenece.
     */
    @Column()
    genero: number;
}

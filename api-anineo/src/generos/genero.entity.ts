import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

/**
 * Entidad Genero
 */
@Entity({name: 'generos'})
export class Genero{

    /**
     * Identificador Autonumerico.
     */
    @PrimaryGeneratedColumn()
    id: number

    /**
     * Nombre del Genero.
     */
    @Column({unique: true})
    nombre: string

    /**
     * Descripcion del Genero.
     */
    @Column({nullable: true})
    descripcion: string
}
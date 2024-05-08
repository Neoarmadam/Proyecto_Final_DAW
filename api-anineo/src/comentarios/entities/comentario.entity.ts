import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * Entidad Comentarios.
 */
@Entity({name: 'comentarios'})
export class Comentario {

    /**
     * Identificador Autonumerico.
     */
    @PrimaryGeneratedColumn()
    id: number

    /**
     * Identificador del anime comentado.
     */
    @Column()
    anime: number

    /**
     * Nombre del usuario que hace el comentario.
     */
    @Column()
    usuario: string

    /**
     * Boleano para identificar si el comentario es positivo o negativo.
     */
    @Column()
    tipo: boolean

    /**
     * String con el texto del comentario.
     */
    @Column()
    comentario: string
}

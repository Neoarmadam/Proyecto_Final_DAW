import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Genero } from './genero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeneroDto } from './dto/create_genero.dto';

/**
 * Servicio de la entidad Genero.
 */
@Injectable()
export class GenerosService {
    constructor(
        @InjectRepository(Genero) private generoRepository: Repository<Genero>
    ){}

    /**
     * Metodo que agrega a la base de datos un genero.
     * @param genero 
     * @returns 
     */
    async createGenero(genero: CreateGeneroDto){
        const generoExist= await this.generoRepository.findOne({
            where: {
                nombre: genero.nombre
            }
        })
        if(generoExist){
            return new HttpException('El genero ya existe', HttpStatus.CONFLICT);
        }else{
            return this.generoRepository.save(this.generoRepository.create(genero));
        }
    }

    /**
     * Metodo que devuelve todos los generos de la base de datos.
     * @returns 
     */
    findAll(): Promise<Genero[]> {
        return this.generoRepository.find();
    }

    /**
     * Metodo que devuelve un genero pasando su Id.
     * @param id 
     * @returns 
     */
    async findOne(id: number){
        const generoExist= await this.generoRepository.findOneBy({ id });
        if(generoExist){
            return generoExist;
        }else{
            return new HttpException('Genero inexistente', HttpStatus.NOT_FOUND);
        }
    }
    
    /**
     * Metodo que elimina un genero de la base de datos pasando su Id.
     * @param id 
     * @returns 
     */
    async remove(id: number){
        const generoExist= await this.generoRepository.findOneBy({ id });
        if(!generoExist){
            return new HttpException('Genero Inexistente', HttpStatus.NOT_FOUND);
        }else{
            return this.generoRepository.delete(id);
        }
    }

    /**
     * Metodo que modifica un genero pasando un Id.
     * @param id 
     * @param createGenero 
     * @returns 
     */
    async updateGenero(id: number, createGenero: CreateGeneroDto): Promise<Genero> {
        const genero = await this.generoRepository.findOneBy({ id });
    
        if (!genero) {
          throw new Error('Genero not found');
        }else{
            genero.nombre = createGenero.nombre;
            genero.descripcion = createGenero.descripcion;
            return this.generoRepository.save(genero);
        }
    }
}

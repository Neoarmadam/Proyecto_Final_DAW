import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Genero } from './genero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeneroDto } from './dto/create_genero.dto';

@Injectable()
export class GenerosService {
    constructor(
        @InjectRepository(Genero) private generoRepository: Repository<Genero>
    ){}

    async createGenero(genero: CreateGeneroDto){
        const generoExist= await this.generoRepository.findOne({
            where: {
                nombre: genero.nombre
            }
        })
        if(generoExist){
            return new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
        }else{
            return this.generoRepository.save(this.generoRepository.create(genero));
        }
    }

    findAll(): Promise<Genero[]> {
        return this.generoRepository.find();
    }

    async findOne(id: number){
        const generoExist= await this.generoRepository.findOneBy({ id });
        if(generoExist){
            return generoExist;
        }else{
            return new HttpException('Genero inexistente', HttpStatus.NOT_FOUND);
        }
    }
    
    async remove(id: number){
        const generoExist= await this.generoRepository.findOneBy({ id });
        if(!generoExist){
            return new HttpException('Genero Inexistente', HttpStatus.NOT_FOUND);
        }else{
            return this.generoRepository.delete(id);
        }
    }

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

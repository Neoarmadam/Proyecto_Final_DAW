import { Injectable } from '@nestjs/common';
import { Genero } from './genero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeneroDto } from './dto/create_genero.dto';


@Injectable()
export class GenerosService {
    constructor(
        @InjectRepository(Genero) private generoRepository: Repository<Genero>
    ){}

    createGenero(genero: CreateGeneroDto){
        return this.generoRepository.save(this.generoRepository.create(genero));
    }

    findAll(): Promise<Genero[]> {
        return this.generoRepository.find();
    }

    findOne(id: number): Promise<Genero | null> {
        return this.generoRepository.findOneBy({ id });
    }
    
    async remove(id: number): Promise<void> {
        await this.generoRepository.delete(id);
    }
}
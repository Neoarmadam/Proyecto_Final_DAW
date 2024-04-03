import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Genero } from './genero.entity';

@Injectable()
export class GeneroService {
  constructor(
    @Inject('GENERO_REPOSITORY')
    private generoRepository: Repository<Genero>,
  ) {}

  async findAll(): Promise<Genero[]> {
    return this.generoRepository.find();
  }
}
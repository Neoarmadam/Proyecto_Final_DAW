import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario) private comentarioRepository: Repository<Comentario>
  ){}

  async create(createComentarioDto: CreateComentarioDto) {
    return this.comentarioRepository.save(this.comentarioRepository.create(createComentarioDto));
  }

  findAll() {
    return this.comentarioRepository.find();
  }

  async findOne(id: number) {
    const comentarioExist= await this.comentarioRepository.findOneBy({ id });
    if(comentarioExist){
      return comentarioExist;
    }else{
      return new HttpException('Comentario inexistente', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, createComentarioDto: CreateComentarioDto) {
    const comentario = await this.comentarioRepository.findOneBy({ id });
    if (!comentario) {
      throw new Error('comentario not found');
    }else{
      comentario.comentario = createComentarioDto.comentario;
      return this.comentarioRepository.save(comentario);
    }
  }

  async remove(id: number) {
    const comentarioExist= await this.comentarioRepository.findOneBy({ id });
    if(!comentarioExist){
      return new HttpException('Comentario Inexistente', HttpStatus.NOT_FOUND);
    }else{
      return this.comentarioRepository.delete(id);
    }
  }
}

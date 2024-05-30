import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { Repository } from 'typeorm';

/**
 * Servicio de la Entidad Comentarios.
 */
@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario) private comentarioRepository: Repository<Comentario>
  ){}

  /**
   * Metodo que crea un Comentario en la base de datos.
   * @param createComentarioDto 
   * @returns 
   */
  async create(createComentarioDto: CreateComentarioDto) {
    return this.comentarioRepository.save(this.comentarioRepository.create(createComentarioDto));
  }

  /**
   * Metodo que devuelve de la base de datos todos los comentarios.
   * @returns 
   */
  findAll() {
    return this.comentarioRepository.find();
  }

  /**
   * Metodo que devuelve de la base de datos un comentario expecifico dando su Id.
   * @param id 
   * @returns 
   */
  async findOne(id: number) {
    const comentarioExist= await this.comentarioRepository.findOneBy({ id });
    if(comentarioExist){
      return comentarioExist;
    }else{
      return new HttpException('Comentario inexistente', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Metodo que actualiza en la base de datos los datos de un comentario identificandolo por su Id.
   * @param id 
   * @param createComentarioDto 
   * @returns 
   */
  async update(id: number, createComentarioDto: CreateComentarioDto) {
    const comentario = await this.comentarioRepository.findOneBy({ id });
    if (!comentario) {
      throw new Error('comentario not found');
    }else{
      comentario.comentario = createComentarioDto.comentario;
      return this.comentarioRepository.save(comentario);
    }
  }

  /**
   * Metodo que elimina un anime pasando su Id.
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    const comentarioExist= await this.comentarioRepository.findOneBy({ id });
    if(!comentarioExist){
      return new HttpException('Comentario Inexistente', HttpStatus.NOT_FOUND);
    }else{
      return this.comentarioRepository.delete(id);
    }
  }

  /**
   * Metodo que devuelve el numero de comentarios positivos de un anime en concreto, pasando el Id del Anime.
   * @param animeId 
   * @returns 
   */
  async numPositivos(animeId:number): Promise<number> {
    const query = `
      SELECT COUNT(*) AS num_comentarios
      FROM comentarios
      WHERE tipo = 1
      AND anime = ?
    `;
    const result = await this.comentarioRepository.query(query, [animeId]);
    
    return parseInt(result[0].num_comentarios);
  }

  /**
   * Metodo que devuelve el numero de comentarios negativos de un anime en concreto, pasando el Id del Anime.
   * @param animeId 
   * @returns 
   */
  async numNegativos(animeId:number): Promise<number> {
    const query = `
      SELECT COUNT(*) AS num_comentarios
      FROM comentarios
      WHERE tipo = 0
      AND anime = ?
    `;
    const result = await this.comentarioRepository.query(query, [animeId]);
    
    return parseInt(result[0].num_comentarios);
  }

  /**
   * Metodo que devuelve todos los comentarios de un Anime en especifico pasando su Id.
   * @param animeId 
   * @returns 
   */
  async findAllAnime(animeId: number) {
    return await this.comentarioRepository.find({ where: { anime: animeId } });
  }

  async deleteComentariosByUsuario(usuario: string){
    return await this.comentarioRepository.delete({ usuario });
  }
}

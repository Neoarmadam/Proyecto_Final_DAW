import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from './anime.entity';
import { Repository } from 'typeorm';

/**
 * Servicio de la Entidad Anime.
 */
@Injectable()
export class AnimesService {

  constructor(
    @InjectRepository(Anime) private animeRepository: Repository<Anime>
  ){}

  /**
   * Metodo que crea un anime en la base de datos.
   * @param createAnimeDto 
   * @returns 
   */
  async create(createAnimeDto: CreateAnimeDto) {
    const animeExist= await this.animeRepository.findOne({
      where: {
        nombre: createAnimeDto.nombre
      }
    })
    if(animeExist){
      return new HttpException('El anime ya existe', HttpStatus.CONFLICT);
    }else{
      return this.animeRepository.save(this.animeRepository.create(createAnimeDto));
    }
  }

  /**
   * Metodo que devuelve todos los animes de la base de datos.
   * @returns 
   */
  findAll() {
    return this.animeRepository.find();
  }

  /**
   * Devuelve un anime en concreto de la base de datos que
   * elegimos pasando su id.
   * @param id
   * @returns 
   */
  async findOne(id: number) {
    const animeExist= await this.animeRepository.findOneBy({ id });
    if(animeExist){
      return animeExist;
    }else{
      return new HttpException('Anime inexistente', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Metodo que actualiza los datos de un anime, dando los 
   * datos nuevos y el id del anime que vamos a actualizar.
   * @param id 
   * @param createAnimeDto 
   * @returns 
   */
  async update(id: number, createAnimeDto: CreateAnimeDto) {
    const anime = await this.animeRepository.findOneBy({ id });
    if (!anime) {
      throw new Error('anime not found');
    }else{
      anime.nombre = createAnimeDto.nombre;
      anime.descripcion = createAnimeDto.descripcion;
      anime.anio=createAnimeDto.anio;
      anime.imagen=createAnimeDto.imagen;
      return this.animeRepository.save(anime);
    }
  }

  /**
   * Metodo que elimina un anime de la base de datos pasando
   * su id.
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    const animeExist= await this.animeRepository.findOneBy({ id });
    if(!animeExist){
      return new HttpException('Anime Inexistente', HttpStatus.NOT_FOUND);
    }else{
      return this.animeRepository.delete(id);
    }
  }
  
  /**
   * Devuelve los animes de la base de datos que sean del genero
   * pasado por parametro.
   * @param id 
   * @returns 
   */
  async findAnimesByGenero(genreId: number): Promise<Anime[]> {
    return this.animeRepository.find({
      where: {
        genero: genreId,
      },
    });
  }
}

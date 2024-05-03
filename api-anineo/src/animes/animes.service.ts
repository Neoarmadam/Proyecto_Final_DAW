import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from './anime.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnimesService {
  constructor(
    @InjectRepository(Anime) private animeRepository: Repository<Anime>
  ){}

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

  findAll() {
    return this.animeRepository.find();
  }

  async findOne(id: number) {
    const animeExist= await this.animeRepository.findOneBy({ id });
    if(animeExist){
      return animeExist;
    }else{
      return new HttpException('Anime inexistente', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, createAnimeDto: CreateAnimeDto) {
    const anime = await this.animeRepository.findOneBy({ id });
    if (!anime) {
      throw new Error('anime not found');
    }else{
      anime.nombre = createAnimeDto.nombre;
      anime.descripcion = createAnimeDto.descripcion;
      return this.animeRepository.save(anime);
    }
  }

  async remove(id: number) {
    const animeExist= await this.animeRepository.findOneBy({ id });
    if(!animeExist){
      return new HttpException('Anime Inexistente', HttpStatus.NOT_FOUND);
    }else{
      return this.animeRepository.delete(id);
    }
  }
  
  async findAnimesByGenero(genreId: number): Promise<Anime[]> {
    return this.animeRepository.find({
      where: {
        genero: genreId,
      },
    });
  }
}

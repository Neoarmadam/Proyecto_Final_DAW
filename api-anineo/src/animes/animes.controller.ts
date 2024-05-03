import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimesService } from './animes.service';
import { CreateAnimeDto } from './dto/create-anime.dto';

/**
 * Controlador de Anime.
 */
@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  /**
   * Metodo que crea un anime en la base de datos.
   * @param createAnimeDto 
   * @returns 
   */
  @Post()
  create(@Body() createAnimeDto: CreateAnimeDto) {
    return this.animesService.create(createAnimeDto);
  }

  /**
   * Metodo que devuelve todos los animes de la base de datos.
   * @returns 
   */
  @Get()
  findAll() {
    return this.animesService.findAll();
  }

  /**
   * Devuelve un anime en concreto de la base de datos que
   * elegimos pasando su id.
   * @param id
   * @returns 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animesService.findOne(+id);
  }

  /**
   * Metodo que actualiza los datos de un anime, dando los 
   * datos nuevos y el id del anime que vamos a actualizar.
   * @param id 
   * @param createAnimeDto 
   * @returns 
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() createAnimeDto: CreateAnimeDto) {
    return this.animesService.update(+id, createAnimeDto);
  }

  /**
   * Metodo que elimina un anime de la base de datos pasando
   * su id.
   * @param id 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animesService.remove(+id);
  }

  /**
   * Devuelve los animes de la base de datos que sean del genero
   * pasado por parametro.
   * @param id 
   * @returns 
   */
  @Get('genero/:id')
  findGenero(@Param('id') id: string) {
    return this.animesService.findAnimesByGenero(+id);
  }
}

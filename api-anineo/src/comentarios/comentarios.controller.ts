import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  create(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentariosService.create(createComentarioDto);
  }

  @Get()
  findAll() {
    return this.comentariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComentarioDto: CreateComentarioDto) {
    return this.comentariosService.update(+id, updateComentarioDto);
  }

  @Delete('id/:id')
  removeById(@Param('id') id: string) {
    return this.comentariosService.removeById(+id);
  }

  @Get('/pos/:id')
  positivos(@Param('id') id: string){
    return this.comentariosService.numPositivos(+id);
  }

  @Get('/neg/:id')
  negativos(@Param('id') id: string){
    return this.comentariosService.numNegativos(+id);
  }

  @Get('/anime/:id')
  findAllAnime(@Param('id') id: number) {
    return this.comentariosService.findAllAnime(id);
  }

  @Delete('usuario/:nombre')
  removeByUsuario(@Param('nombre') nombre: string) {
    return this.comentariosService.removeByUsuario(nombre);
  }
  
}

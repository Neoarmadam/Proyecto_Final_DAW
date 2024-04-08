import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimesService } from './animes.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Post()
  create(@Body() createAnimeDto: CreateAnimeDto) {
    return this.animesService.create(createAnimeDto);
  }

  @Get()
  findAll() {
    return this.animesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createAnimeDto: CreateAnimeDto) {
    return this.animesService.update(+id, createAnimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animesService.remove(+id);
  }
}

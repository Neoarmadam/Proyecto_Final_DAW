import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create_genero.dto';
import { GenerosService } from './generos.service';
import { Genero } from './genero.entity';

@Controller('generos')
export class GenerosController {

    constructor(
        private generoService:GenerosService
    ){}

    @Get()
    findAll(){
        return this.generoService.findAll();
    }

    @Get(":id")
    getApiUsuario(@Param('id') id: number): any{
        return this.generoService.findOne(id);
    }

    @Post()
    create(@Body() newGenero:CreateGeneroDto){
        return this.generoService.createGenero(newGenero);
    }

    @Delete(':id')
    deleteUsuario(@Param('id') id: number): any {
        const removeGenero = this.generoService.remove(id);
        return removeGenero;
    }
}

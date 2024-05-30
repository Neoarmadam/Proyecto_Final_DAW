import { Body, Controller, Get, Param, Post, Delete, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create_usuario.dto';
import { LoginUsuarioDto } from './dto/login_usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Get()
    findAll() {
        return this.usuariosService.findAll();
    }

    @Get(":id")
    findOne(@Param('id') id: number): any {
        return this.usuariosService.findOne(id);
    }

    @Post()
    create(@Body() newUsuarios: CreateUsuarioDto) {
        return this.usuariosService.createUsuario(newUsuarios);
    }

    @Post("/login")
    login(@Body() loginUsuarioDto: LoginUsuarioDto) {
        return this.usuariosService.loginUsuario(loginUsuarioDto);
    }

    @Delete("/:id")
    async deleteById(@Param('id', ParseIntPipe) id: number) {
       /*  if(!id) return console.error('No se ha recibido un id');
        console.log(id); */
        await this.usuariosService.deleteById(id);

    }
}

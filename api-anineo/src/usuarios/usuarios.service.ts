import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create_usuario.dto';
import { LoginUsuarioDto } from './dto/login_usuario.dto';


@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>
    ){}

    async createUsuario(usuario: CreateUsuarioDto){
        const { correo, nombre } = usuario;
        
        const usuarioExist= await this.usuarioRepository.findOne({
            where: [{ correo }, { nombre }],
        })
        if(usuarioExist){
            return new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
        }else{
            return this.usuarioRepository.save(this.usuarioRepository.create(usuario));
        }
    }

    findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find({ where: { administrador: false } });
    }

    async findOne(id: number){
        const usuarioExist= await this.usuarioRepository.findOneBy({ id });
        if(usuarioExist){
            return usuarioExist;
        }else{
            return new HttpException('usuario inexistente', HttpStatus.NOT_FOUND);
        }
    }

    async loginUsuario(loginUsuarioDto: LoginUsuarioDto) {
        const { correo, contraseña } = loginUsuarioDto;
        const usuario = await this.usuarioRepository.findOne({
          where: { correo, contraseña },
        });
        if (!usuario) {
          throw new UnauthorizedException('Credenciales no validas');
        }
        return usuario;
    }
}

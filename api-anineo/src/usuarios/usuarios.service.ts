import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create_usuario.dto';


@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>
    ){}

    async createUsuario(usuario: CreateUsuarioDto){
        const usuarioExist= await this.usuarioRepository.findOne({
            where: {
                nombre: usuario.nombre
            }
        })
        if(usuarioExist){
            return new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
        }else{
            return this.usuarioRepository.save(this.usuarioRepository.create(usuario));
        }
    }

    findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    async findOne(id: number){
        const usuarioExist= await this.usuarioRepository.findOneBy({ id });
        if(usuarioExist){
            return usuarioExist;
        }else{
            return new HttpException('usuario inexistente', HttpStatus.NOT_FOUND);
        }
    }
}

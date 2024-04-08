import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenerosModule } from './generos/generos.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Genero } from './generos/genero.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/usuario.entity';
import { AnimesModule } from './animes/animes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'anineo',
      entities:[Genero, Usuario],
      synchronize: true
    }),
    GenerosModule,
    UsuariosModule,
    AnimesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

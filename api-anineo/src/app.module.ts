import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';

//Genero
import { GenerosModule } from './generos/generos.module';
import { Genero } from './generos/genero.entity';

//Usuario
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/usuario.entity';

//Anime
import { AnimesModule } from './animes/animes.module';
import { Anime } from './animes/anime.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'anineo',
      entities:[Genero, Usuario, Anime],
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

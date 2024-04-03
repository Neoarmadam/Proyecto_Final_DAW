import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenerosModule } from './generos/generos.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Genero } from './generos/genero.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'anineo',
      entities:[Genero],
      synchronize: true
    }),
    GenerosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
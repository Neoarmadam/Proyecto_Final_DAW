import { Module } from '@nestjs/common';
import { DbModule } from 'src/bd/db.module';
import { generoProviders } from './genero.providers';
import { GeneroService } from './genero.service';

@Module({
  imports: [DbModule],
  providers: [
    ...generoProviders,
    GeneroService,
  ],
})
export class GeneroModule {}
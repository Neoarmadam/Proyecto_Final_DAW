import { Module } from '@nestjs/common';
import { AnimesService } from './animes.service';
import { AnimesController } from './animes.controller';
import { Anime } from './anime.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Anime])],
  controllers: [AnimesController],
  providers: [AnimesService],
})
export class AnimesModule {}

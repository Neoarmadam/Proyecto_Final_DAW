import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AnimesService } from '../animes.service';
import { ComentariosService } from '../comentarios.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.css'
})

export class AnimeComponent {
  anime:any;
  animeId:any;
  comentarios:any[]=[];
  positivos:any;
  negativos:any;

  constructor(
    private route: ActivatedRoute,
    private animeService:AnimesService,
    private comentariosService:ComentariosService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.animeId = params['id'];
      this.findOneAnime(this.animeId);
      this.findComentarios(this.animeId);
      this.findNegativos(this.animeId);
      this.findPositivos(this.animeId);
    });
  }
  
  findOneAnime(id:number){
    this.animeService.findOne(id).subscribe(response => {
      this.anime=response;
    });
  }

  findComentarios(id:number){
    this.comentariosService.findAllAnime(id).subscribe(response => {
      if (Array.isArray(response)) {
        this.comentarios=response;
      } else {
        console.error('Los datos recibidos no son un array:', response);
      }
    });
  }

  findNegativos(id:number){
    this.comentariosService.findNegAnime(id).subscribe(response => {
      this.negativos=response;
    });
  }

  findPositivos(id:number){
    this.comentariosService.findPosAnime(id).subscribe(response => {
      this.positivos=response;
      console.log(this.positivos);
    });
  }
}

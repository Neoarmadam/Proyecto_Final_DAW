import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AnimesService } from '../animes.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.css'
})

export class AnimeComponent {
  anime:any;
  animeId:any;

  constructor(
    private route: ActivatedRoute,
    private animeService:AnimesService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.animeId = params['id'];
      this.findOneAnime(this.animeId);
    });
  }
  
  findOneAnime(id:number){
    this.animeService.findOne(id).subscribe(response => {
      this.anime=response;
    });
  }
}

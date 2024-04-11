import { Component } from '@angular/core';
import { AnimesService } from '../animes.service';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  animes:any[]=[];
  generos:any[]=[];
  generoSeleccionado:string="0";
  
  constructor(
    private animeService:AnimesService,
    private generosService:GenerosService
  ){
    this.findAllAnimes();
    this.findAllGeneros();
  }

  findAllAnimes(){
    this.animeService.findAll().subscribe(response => {
      if (Array.isArray(response)) {
        this.animes=response;
      } else {
        console.error('Los datos recibidos no son un array:', response);
      }
    });
  }

  findAllGeneros(){
    this.generosService.findAll().subscribe(response => {
      if (Array.isArray(response)) {
        this.generos = response;
        console.log(this.generos);
      } else {
        console.error('Los datos recibidos no son un array:', response);
      }
    });
  }

  

}

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
  filtrar: string = '';
  
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

  filtrarGenero(){
    if(this.generoSeleccionado=="0"){
      this.findAllAnimes();
    }else{
        this.animeService.findGenero(this.generoSeleccionado).subscribe(response => {
          if (Array.isArray(response)) {
            this.animes=response;
          } else {
            console.error('Los datos recibidos no son un array:', response);
          }
        });
    }
  }

  buscar() {
    if (!this.filtrar.trim()) {
      this.findAllAnimes();
    } else {
      this.animes = this.animes.filter(anime =>
        anime.nombre.toLowerCase().includes(this.filtrar.toLowerCase())
      );
    }
  }

}

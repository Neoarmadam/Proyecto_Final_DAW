import { Component } from '@angular/core';
import { GenerosService } from '../generos.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-crear-animes',
  templateUrl: './crear-animes.component.html',
  styleUrl: './crear-animes.component.css'
})
export class CrearAnimesComponent {
  generos:any[]=[];
  nuevoAnime={
    nombre:"",
    descripcion:"",
    enEmision:true,
    anio:null,
    imagen:"",
    genero:null
  }

  constructor(
    private generosService:GenerosService,
    private http: HttpClient
  ){
    this.findAllGeneros();
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

  submitForm() {
    console.log("crear");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post("http://localhost:3000/animes", this.nuevoAnime, { headers })
      .subscribe(
        response => {
          console.log('Anime enviado con éxito:', response);
          this.limpiarFormulario();
        },
        error => {
          console.error('Error al enviar el Anime:', error);
        }
      );
  }

  limpiarFormulario() {
    this.nuevoAnime={
      nombre:"",
      descripcion:"",
      enEmision:true,
      anio:null,
      imagen:"",
      genero:null
    }
  }
}

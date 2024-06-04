import { Component } from '@angular/core';
import { GenerosService } from '../generos.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AnimesService } from '../animes.service';


@Component({
  selector: 'app-editar-anime',
  templateUrl: './editar-anime.component.html',
  styleUrl: './editar-anime.component.css'
})
export class EditarAnimeComponent {
  anime:any;
  generos:any[]=[];
  nuevoAnime={
    nombre:"",
    descripcion:"",
    enEmision:true,
    anio:null,
    imagen:"",
    genero:null
  }
  usuarioLogueado: boolean = false;
  isAdmin: boolean = false;
  animeId:number=0;

  constructor(
    private route: ActivatedRoute,
    private generosService:GenerosService,
    //private http: HttpClient,
    private usuariosService:UsuariosService,
    private animeService:AnimesService,
  ){
    this.route.params.subscribe((params: Params) => {
      this.animeId = params['id'];
      this.findOneAnime(this.animeId);
    });
    this.logeado()
    this.findAllGeneros();
  }

  findAllGeneros(){
    this.generosService.findAll().subscribe(response => {
      if (Array.isArray(response)) {
        this.generos = response;
      } else {
        console.error('Los datos recibidos no son un array:', response);
      }
    });
  }

  submitForm() {
    this.animeService.updateAnime(this.animeId, this.nuevoAnime).subscribe(
      response => {
        console.log('Anime enviado con éxito:', response);
        window.location.href = '/';
      },
      error => {
        console.error('Error al enviar el Anime:', error);
      }
    );
  }

  logeado(){
    const usuario = this.usuariosService.getUsuario();
    this.isAdmin = usuario ? usuario.administrador : false;
    this.usuariosService.usuarioLogueado$.subscribe(logueado => {
      this.usuarioLogueado = logueado;
    });
    if(this.usuarioLogueado==false || this.isAdmin==false){
      window.location.href = '/login';
    }
  }

  findOneAnime(id:number){
    this.animeId=id;
    this.animeService.findOne(id).subscribe(response => {
      this.anime=response;
      this.nuevoAnime.nombre=this.anime.nombre;
      this.nuevoAnime.descripcion=this.anime.descripcion;
      this.nuevoAnime.enEmision=this.anime.enEmision;
      this.nuevoAnime.anio=this.anime.anio;
      this.nuevoAnime.imagen=this.anime.imagen;
      this.nuevoAnime.genero=this.anime.genero;

    });
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AnimesService } from '../animes.service';
import { ComentariosService } from '../comentarios.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosService } from '../usuarios.service';

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
  comentario = {
    anime: null,
    usuario: '',
    tipo: true,
    comentario: ''
  };
  usuario:any;
  usuarioLogueado: boolean = false;
  isAdmin: boolean = false;
  idAnime:number=0;

  constructor(
    private route: ActivatedRoute,
    private animeService:AnimesService,
    private comentariosService:ComentariosService,
    private http: HttpClient,
    private usuariosService:UsuariosService
  ) {
    this.logeado();
    this.recuperarUsuario();
    this.route.params.subscribe((params: Params) => {
      this.animeId = params['id'];
      this.findOneAnime(this.animeId);
      this.findComentarios(this.animeId);
      this.findNegativos(this.animeId);
      this.findPositivos(this.animeId);
    });
  }
  
  findOneAnime(id:number){
    this.idAnime=id;
    this.animeService.findOne(id).subscribe(response => {
      this.anime=response;
    });
  }

  recuperarUsuario(){
    this.usuario=this.usuariosService.getUsuario();
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

  submitForm() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.comentario.anime = this.animeId;
    this.comentario.usuario=this.usuario.nombre;
    this.http.post("http://localhost:3000/comentarios", this.comentario, { headers })
      .subscribe(
        response => {
          console.log('Comentario enviado con éxito:', response);
          this.limpiarFormulario();
          this.findNegativos(this.animeId);
          this.findPositivos(this.animeId);
          this.findComentarios(this.animeId);
        },
        error => {
          console.error('Error al enviar el comentario:', error);
        }
      );
  }

  limpiarFormulario() {
    this.comentario = {
      anime: null,
      usuario: '',
      tipo: true,
      comentario: ''
    };
  }

  logeado(){
    this.usuariosService.usuarioLogueado$.subscribe(logueado => {
      this.usuarioLogueado = logueado;
    });
    const usuario = this.usuariosService.getUsuario();
    this.isAdmin = usuario ? usuario.administrador : false;
    if(this.usuarioLogueado==false){
      window.location.href = '/login';
    }
  }

  borrarComentario(id:number){
    this.comentariosService.deleteComentarioId(id).subscribe(response => {
      this.findComentarios(this.idAnime);
    }); 
  }

  borrarAnime(id:number){
    this.animeService.deleteAnimeId(id).subscribe(response => {
      window.location.href = '/';
    }); 
  }

  editarAnime(id:number){
    window.location.href = '/editaranime/'+id;
  }
}

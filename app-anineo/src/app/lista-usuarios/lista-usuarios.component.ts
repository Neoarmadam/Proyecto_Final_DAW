import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { ComentariosService } from '../comentarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {
  usuarios:any[]=[];
  usuarioLogueado: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private usuariosService:UsuariosService,
    private comentariosService:ComentariosService
  ){
    this.findUsuarios();
  }

  findUsuarios(){
    this.usuariosService.findAll().subscribe(response => {
      
      if (Array.isArray(response)) {
        this.usuarios=response;
      } else {
        console.error('Los datos recibidos no son un array:', response);
      }
    });
  }

  deleteUsuario(id:number, nombre:string){
    this.usuariosService.deleteUsuario(id).subscribe(response => {
      console.log(response);
      this.findUsuarios();
      this.deleteComentariosUsuarios(nombre);
    }); 
  }

  deleteComentariosUsuarios(nombre:string){
    this.comentariosService.deleteComentariosUsuario(nombre).subscribe(response => {
      console.log(response);
    }); 
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
}

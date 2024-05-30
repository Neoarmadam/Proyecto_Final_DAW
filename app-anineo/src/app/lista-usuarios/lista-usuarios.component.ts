import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';

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
    private usuariosService:UsuariosService
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

  deleteUsuario(id:number){
    console.log("David:"+id)
    this.usuariosService.deleteUsuario(id);
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

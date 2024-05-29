import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {
  usuarios:any[]=[];

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
    this.usuariosService.deleteUsuario(id);
  }
}

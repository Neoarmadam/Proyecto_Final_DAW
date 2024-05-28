import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {
  nombre: string ='';
  correo: string = '';
  contrase: string = '';
  administrador: number= 0;
  error: string = '';

  constructor(private authService: UsuariosService, private router: Router) {}

  onLogin() {
    this.authService.login(this.correo, this.contrase).subscribe(
      () => {
        window.location.href = '/';
      },
      (error) => {
        this.error = 'Credenciales inválidas';
      }
    );
  }

  crearLogin(){
    this.authService.crearUsuario(this.nombre, this.correo, this.contrase).subscribe(
      () => {
        this.onLogin();
      },
      (error) => {
        this.error = 'Error creando el usuario';
      }
    );
  }

}
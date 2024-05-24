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
  error: string = '';

  constructor(private authService: UsuariosService, private router: Router) {}

  onLogin() {
    this.authService.login(this.correo, this.contrase).subscribe(
      () => {
        this.router.navigate(['/']); // Navega a la página principal o a donde desees
      },
      (error) => {
        this.error = 'Credenciales inválidas';
      }
    );
  }
}

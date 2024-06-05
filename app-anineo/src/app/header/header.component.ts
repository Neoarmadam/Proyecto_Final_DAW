import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  usuarioLogueado: boolean = false;
  isAdmin: boolean = false;
  nombreUsuario:string="";

  constructor(private authService: UsuariosService) {
      const usuario = this.authService.getUsuario();
      this.isAdmin = usuario ? usuario.administrador : false;
      this.nombreUsuario=usuario ?usuario.nombre: "false";
  }

  ngOnInit() {
    this.authService.usuarioLogueado$.subscribe(logueado => {
      this.usuarioLogueado = logueado;
    });
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    window.location.href = '/';
  }
}

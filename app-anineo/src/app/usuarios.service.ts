import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/usuarios/login';

  constructor(private http: HttpClient) { }

  login(correo: string, contraseña: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { correo, contraseña }).pipe(
      tap(response => {
        // Guarda la información completa del usuario en el almacenamiento local
        localStorage.setItem('usuario', JSON.stringify(response));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }

  getUsuario(): any {
    const usuarioStr = localStorage.getItem('usuario');
    return usuarioStr ? JSON.parse(usuarioStr) : null;
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('usuario');
  }
}

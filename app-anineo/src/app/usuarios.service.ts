import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private usuarioLogueadoSubject: BehaviorSubject<boolean>;
  public usuarioLogueado$: Observable<boolean>;
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {
    const usuario = localStorage.getItem('usuario');
    this.usuarioLogueadoSubject = new BehaviorSubject<boolean>(!!usuario);
    this.usuarioLogueado$ = this.usuarioLogueadoSubject.asObservable();
  }

  login(correo: string, contraseña: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/login", { correo, contraseña }).pipe(
      tap(response => {
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
  
  checkUsuarioLogueado(): boolean {
    return !!localStorage.getItem('usuario');
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.usuarioLogueadoSubject.next(false);
  }

  crearUsuario(nombre: string, correo: string, contraseña: string): Observable<any> {
    const administrador=0;
    return this.http.post<any>(this.apiUrl, { nombre, correo, contraseña, administrador }).pipe(
      tap(response => {
        console.log('Usuario Creado:', response);
      })
    );
  }

  findAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteUsuario(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}

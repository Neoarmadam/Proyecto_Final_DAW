import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private urlApi = "http://localhost:3000/comentarios";

  constructor(private http:HttpClient) { }

  findAllAnime(anime:number) {
    return this.http.get<any[]>(this.urlApi+'/anime/'+anime);
  }

  findPosAnime(anime:number) {
    return this.http.get<any[]>(this.urlApi+'/pos/'+anime);
  }

  findNegAnime(anime:number) {
    return this.http.get<any[]>(this.urlApi+'/neg/'+anime);
  }

  deleteComentariosUsuario(nombre:string) {
    return this.http.delete(this.urlApi+"/usuario/"+nombre);
  }

  deleteComentarioId(id:number){
    return this.http.delete(this.urlApi+"/id/"+id);
  }
  
}

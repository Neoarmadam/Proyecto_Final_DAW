import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimesService {

  private urlApi = "http://localhost:3000/animes";

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<any[]>(this.urlApi);
  }

  findGenero(genero:string) {
    return this.http.get<any[]>(this.urlApi+"/genero/"+genero);
  }

  findOne(id:number){
    return this.http.get<any[]>(this.urlApi+"/"+id);
  }

  deleteAnimeId(id:number){
    return this.http.delete(this.urlApi+"/"+id);
  }

  updateAnime(id: number, anime: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.urlApi+"/"+id, anime, { headers });
  }

}

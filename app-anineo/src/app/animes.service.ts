import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
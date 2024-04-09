import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private urlApi = "http://localhost:3000/generos";

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<any[]>(this.urlApi);
  }
}

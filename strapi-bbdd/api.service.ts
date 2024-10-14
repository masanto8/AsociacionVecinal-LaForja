import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:1337';  // URL del backend de Strapi

  constructor(private http: HttpClient) { }

  // Método para obtener datos (por ejemplo, un listado de posts)
  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`);
  }

  // Método para obtener un solo post
  getPost(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${id}`);
  }

  // Otros métodos para interactuar con la API de Strapi, como crear, actualizar, o eliminar datos
}
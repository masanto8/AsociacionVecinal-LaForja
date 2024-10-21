import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Junta {
  Anyo: number;
  Presidente: string;
  Vicepresidente: string;
  Secretaria: string;
  Tesoreria: string;
  Vocal1: string;
  Vocal2: string;
  Vocal3: string;
  Vocal4: string;
  Vocal5: string;
  Vocal6: string;
  Vocal7: string;
  Vocal8: string;
  Vocal9: string;
  Vocal10: string;
}
@Component({
  selector: 'app-junta',
  templateUrl: './junta.component.html',
  styleUrl: './junta.component.css'
})
export class JuntaComponent implements OnInit{
  junta: Junta[] = [];


  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.http.get<{ data: Junta[] }>('http://localhost:1337/api/juntas') // Asegúrate de usar la ruta correcta
      .subscribe({
        next: (response) => {
          this.junta = response.data; // Cambia aquí para acceder a response.data
          console.log(this.junta); // Opcional: Verifica que `junta` se haya asignado correctamente
        },
        error: (error) => {
          console.error('Error fetching data from Strapi:', error);
        }
      });
  }
}

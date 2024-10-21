import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Junta {
  anyo: number;
  presidente: string;
  vicepresidente: string;
  secretaria: string;
  tasereria: string;
  vocal1: string;
  vocal2: string;
  vocal3: string;
  vocal4: string;
  vocal5: string;
  vocal6: string;
  vocal7: string;
  vocal8: string;
  vocal9: string;
  vocal10: string;
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
    this.http.get<Junta[]>('http://localhost:1337/junta') 
      .subscribe({
        next: (data: Junta[]) => {
          this.junta = data; 
        },
        error: (error) => {
          console.error('Error fetching data from Strapi:', error);
        }
      });
  }
}

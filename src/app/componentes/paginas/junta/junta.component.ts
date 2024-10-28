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
  filteredJunta: Junta[] = [];       // Junta filtrada por año
  availableYears: number[] = [];     // Años disponibles
  selectedYear: number | null = null;


  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.fetchJuntaData();
  }

  fetchJuntaData(): void {
    this.http.get<{ data: Junta[] }>('http://localhost:1337/api/juntas')
      .subscribe({
        next: (response) => {
          this.junta = response.data;

          // Extraemos los años y los ordenamos de mayor a menor
          this.availableYears = [...new Set(this.junta.map(item => item.Anyo))].sort((a, b) => b - a).slice(0, 5);

          // Establecemos el año más reciente como seleccionado por defecto
          this.selectedYear = this.availableYears[0];
          this.filterJunta();  // Filtramos los datos para el año más reciente
        },
        error: (error) => {
          console.error('Error fetching data from Strapi:', error);
        }
      });
  }

  onYearChange(): void {
    this.filterJunta();
  }

  filterJunta(): void {
    this.filteredJunta = this.junta.filter(item => item.Anyo === this.selectedYear);
  }
}

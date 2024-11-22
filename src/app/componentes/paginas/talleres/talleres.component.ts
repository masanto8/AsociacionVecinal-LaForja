import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Taller {
  Anyo: number;
  NombreTaller: string;
  Cartel: 'image/jpeg' | 'image/png' | 'application/pdf';
}
@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrl: './talleres.component.css'
})
export class TalleresComponent implements OnInit{
  taller: Taller[] = [];
  filteredTaller: Taller[] = [];       // Transparencia filtrada por año
  availableYears: number[] = [];     // Años disponibles
  selectedYear: number | null = null;
  private readonly BASE_URL = 'http://localhost:1337';

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.fetchTallerData();
  }

  fetchTallerData(): void {
    this.http.get<{ data: Taller[] }>('http://localhost:1337/api/talleres')
      .subscribe({
        next: (response) => {
          this.taller = response.data;

          // Extraemos los años y los ordenamos de mayor a menor
          this.availableYears = [...new Set(this.taller.map(item => item.Anyo))].sort((a, b) => b - a).slice(0, 2);

          // Establecemos el año más reciente como seleccionado por defecto
          this.selectedYear = this.availableYears[0];
          this.filterTaller();  // Filtramos los datos para el año más reciente
        },
        error: (error) => {
          console.error('Error fetching data from Strapi:', error);
        }
      });
  }

  updateYear(event: Event): void {
    const target = event.target as HTMLSelectElement | null; // Especificar tipo
    if (target) {
      this.selectedYear = +target.value; // Convierte el valor a número
      this.filterTaller();
    }
  }

  filterTaller(): void {
    if (this.selectedYear !== null) {
      this.filteredTaller = this.taller.filter(item => item.Anyo === this.selectedYear);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Transparencia {
  Anyo: number;
  InformacionEconomica: 'application/pdf';
  FuncionesNormativa: 'application/pdf';
  SubvencionesActividades: 'application/pdf';
  SubvencionesActividadesAnexoI: 'application/pdf';
  SubvencionesActividadesAnexoII: 'application/pdf';
  SubvencionesActividadesAnexoIII: 'application/pdf';
  SubvencionesActividadesAnexoIV: 'application/pdf';
  SubvencionesActividadesAnexoV: 'application/pdf';
  SubvencionesActividadesAnexoVI: 'application/pdf';
  SubvencionesActividadesAnexoVII: 'application/pdf';
  SubvencionesActividadesAnexoVIII: 'application/pdf';
  SubvencionesActividadesAnexoIX: 'application/pdf';
  SubvencionesActividadesAnexoX: 'application/pdf';
}
@Component({
  selector: 'app-transparencia',
  templateUrl: './transparencia.component.html',
  styleUrl: './transparencia.component.css'
})
export class TransparenciaComponent implements OnInit{
  transparencia: Transparencia[] = [];
  filteredTransparencia: Transparencia[] = [];       // Transparencia filtrada por año
  availableYears: number[] = [];     // Años disponibles
  selectedYear: number | null = null;

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.fetchTransparenciaData();
  }

  fetchTransparenciaData(): void {
    this.http.get<{ data: Transparencia[] }>('http://localhost:1337/api/transparencias')
      .subscribe({
        next: (response) => {
          this.transparencia = response.data;

          // Extraemos los años y los ordenamos de mayor a menor
          this.availableYears = [...new Set(this.transparencia.map(item => item.Anyo))].sort((a, b) => b - a).slice(0, 5);

          // Establecemos el año más reciente como seleccionado por defecto
          this.selectedYear = this.availableYears[0];
          this.filterTransparencia();  // Filtramos los datos para el año más reciente
        },
        error: (error) => {
          console.error('Error fetching data from Strapi:', error);
        }
      });
  }

  onYearChange(): void {
    this.filterTransparencia();
  }

  filterTransparencia(): void {
    this.filteredTransparencia = this.transparencia.filter(item => item.Anyo === this.selectedYear);
  }
}


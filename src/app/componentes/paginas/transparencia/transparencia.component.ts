import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


interface PdfFile {
  url: string;
}
interface Transparencia {
  Anyo: number;
  InformacionEconomica?: PdfFile[];
  FuncionesNormativa?: PdfFile[];
  SubvencionesActividades?: PdfFile[];
  SubvencionesActividadesAnexoI?: PdfFile[];
  SubvencionesActividadesAnexoII?: PdfFile[];
  SubvencionesActividadesAnexoIII?: PdfFile[];
  SubvencionesActividadesAnexoIV?: PdfFile[];
  SubvencionesActividadesAnexoV?: PdfFile[];
  SubvencionesActividadesAnexoVI?: PdfFile[];
  SubvencionesActividadesAnexoVII?: PdfFile[];
  SubvencionesActividadesAnexoVIII?: PdfFile[];
  SubvencionesActividadesAnexoIX?: PdfFile[];
  SubvencionesActividadesAnexoX?: PdfFile[];
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
  private readonly BASE_URL = 'http://localhost:1337';
  
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}


  ngOnInit(): void {
    this.fetchTransparenciaData();
  }

  fetchTransparenciaData(): void {
    this.http.get<{ data: Transparencia[] }>('http://localhost:1337/api/transparencias?populate=*')
      .subscribe({
        next: (response) => {
          console.log('Datos recibidos desde Strapi:', response);  // Agrega este log
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


  getSanitizedUrl(url: string): SafeResourceUrl {
    const fullUrl = url.startsWith('http') ? url : `${this.BASE_URL}${url}`;
    console.log(this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl));
    return this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
  }
}


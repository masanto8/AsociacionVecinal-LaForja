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
  NombreAnexoI?: string;
  NombreAnexoII?: string;
  NombreAnexoIII?: string;
  NombreAnexoIV?: string;
  NombreAnexoV?: string;
  NombreAnexoVI?: string;
  NombreAnexoVII?: string;
  NombreAnexoVIII?: string;
  NombreAnexoIX?: string;
  NombreAnexoX?: string;
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
  
  // Variable para controlar la visualización del PDF
  showPdf: boolean = false;
  pdfUrl: SafeResourceUrl | null = null; // URL del PDF a mostrar

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}


  ngOnInit(): void {
    this.fetchTransparenciaData();
  }

  fetchTransparenciaData(): void {
    this.http.get<{ data: Transparencia[] }>('http://localhost:1337/api/transparencias?populate=*')
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

  updateYear(event: Event): void {
    const target = event.target as HTMLSelectElement | null; // Especificar tipo
    if (target) {
      this.selectedYear = +target.value; // Convierte el valor a número
      this.filterTransparencia();
    }
  }

  filterTransparencia(): void {
    if (this.selectedYear !== null) {
      this.filteredTransparencia = this.transparencia.filter(item => item.Anyo === this.selectedYear);
    }
  }

  // Función para mostrar el PDF correspondiente
  showDocument(url: string): void {
    const completeUrl = url.startsWith('/') ? `${this.BASE_URL}${url}` : url;
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(completeUrl);
    this.showPdf = true;
  }

  // Función para ocultar el PDF
  hideDocument(): void {
    this.showPdf = false;
    this.pdfUrl = null;
  }

  //Función para el scrollsky
  scrollTo(id: string, event: Event): void {
    event.preventDefault(); // Evita redirecciones
    const element = document.getElementById(id);
    if (element) {
      const offset = 250; // Ajusta este valor a la altura de tu navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
}


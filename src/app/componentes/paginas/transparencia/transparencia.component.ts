import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


interface PdfFile {
  url: string;
}

interface Anexo {
  nombre: string;
  titulo?: string;
  url: string;
}
interface Transparencia {
  Anyo: number;
  InformacionEconomica?: PdfFile[];
  FuncionesNormativa?: PdfFile[];
  SubvencionesActividades?: PdfFile[];
  anexos?: Anexo[];
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

  hasSection(trans: Transparencia, key: keyof Transparencia): boolean {
    const value = trans[key] as any;
    return value && value.length > 0;
  }

  getAnexos(trans: Transparencia): Anexo[] {
    const anexos: Anexo[] = [];

    const romanos = [
      'I','II','III','IV','V','VI','VII','VIII','IX','X',
      'XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'
    ];

    romanos.forEach((r) => {
      const key = `SubvencionesActividadesAnexo${r}` as keyof Transparencia;
      const nombreKey = `NombreAnexo${r}` as keyof Transparencia;

      const archivos = trans[key] as PdfFile[] | undefined;
      const titulo = trans[nombreKey] as string | undefined;

      if (archivos && archivos.length > 0) {
        anexos.push({
          nombre: `Anexo ${r}`,
          titulo,
          url: archivos[0].url
        });
      }
    });

    return anexos;
  }

  fetchTransparenciaData(): void {
    this.http.get<{ data: Transparencia[] }>('http://localhost:1337/api/transparencias?populate=*')
      .subscribe({
        next: (response) => { 
          this.transparencia = response.data.map(trans => ({
            ...trans,
            anexos: this.getAnexos(trans)
          }));

          this.availableYears = [...new Set(this.transparencia.map(item => item.Anyo))]
            .sort((a, b) => b - a)
            .slice(0, 5);

          this.selectedYear = this.availableYears[0];
          this.filterTransparencia();
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
    const completeUrl = url.startsWith('/') 
      ? `${this.BASE_URL}${url}` 
      : url;

    window.open(completeUrl, '_blank');
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


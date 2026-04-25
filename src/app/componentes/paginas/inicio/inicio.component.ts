import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



interface Novedades {
  Titulo: string;
  Tipo: string;
  Multimedia : any;
  EnlaceExterno?: string;
  Contenido: string;
  ContenidoResumido?: string;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  novedades: Novedades[] = [];
  tipos: string[] = ['Noticia', 'Evento', 'Junta', 'Reunion'];
  selectedNovedad: string = '';
  searchTerm: string = '';
  BASE_URL = 'http://localhost:1337';
  selectedTipos: string[] = []; // Almacena los tipos seleccionados
  isDropdownOpen: boolean = false;

  temas = [
    {
      titulo: 'Transporte',
      desc: 'Mejora de movilidad urbana y transporte público',
      img1: 'assets/imagenes/autobus.jpg',
      img2: 'assets/imagenes/bus_asientos.jpg'
    },
    {
      titulo: 'Sanidad',
      desc: 'Acceso a servicios sanitarios de calidad',
      img1: 'assets/imagenes/sanidad.jpg',
      img2: 'assets/imagenes/ambulancia.jpg'
    },
    {
      titulo: 'Urbanismo',
      desc: 'Desarrollo sostenible de la ciudad',
      img1: 'assets/imagenes/urbanismo.jpg',
      img2: 'assets/imagenes/vivienda.jpg'
    },
    {
      titulo: 'Cultura',
      desc: 'Promoción de actividades culturales y participación ciudadana',
      img1: 'assets/imagenes/cultura.jpg',
      img2: 'assets/imagenes/arte.jpg'
    },
    {
      titulo: 'Educación',
      desc: 'Impulso de formación, talleres y aprendizaje comunitario',
      img1: 'assets/imagenes/libros.jpg',
      img2: 'assets/imagenes/clase.jpg'
    }
  ];
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:1337/api/novedades?populate=*')
      .subscribe({
        next: (data: any) => {         
          this.novedades = data?.data || []; 
          console.log(this.novedades);
        },
        error: (error) => {
          console.error('Error fetching data from Strapi:', error);
        }
      });
  }

  get filteredNovedades(): Novedades[] {
    return this.novedades;
  }

  get temasCarousel() {
    return [...this.temas, ...this.temas];
  }

  getTemaImage(tema: any, index: number): string {
    return index < this.temas.length ? tema.img1 : tema.img2;
  }

  getCardClass(tipo: string): string {
    switch (tipo) {
      case 'Noticia':
        return 'linea-azul';
      case 'Evento':
        return 'linea-roja';
      case 'Junta':
        return 'linea-amarilla';
      case 'Reunion':
        return 'linea-verde';
      default:
        return 'linea-azul';
    }
  }
}

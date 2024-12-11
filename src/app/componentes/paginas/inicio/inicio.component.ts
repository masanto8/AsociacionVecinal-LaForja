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

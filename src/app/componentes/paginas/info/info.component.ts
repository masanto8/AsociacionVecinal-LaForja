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
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit{
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
    return this.novedades.filter(novedades => {
      const matchesNovedad = this.selectedNovedad ? novedades.Tipo === this.selectedNovedad : true;
      const matchesSearchTerm = this.searchTerm ? 
        (novedades.Titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        novedades.Contenido.toLowerCase().includes(this.searchTerm.toLowerCase())) : true;
      return matchesNovedad && matchesSearchTerm;
    });
  }

  onSearchTermChange(): void {
    this.selectedNovedad = '';
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Maneja los cambios en los checkboxes
  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedTipos.push(target.value);
    } else {
      this.selectedTipos = this.selectedTipos.filter((tipo) => tipo !== target.value);
    }
  }

  // Marca o desmarca todas las opciones
  selectAll(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedTipos = [...this.tipos];
    } else {
      this.selectedTipos = [];
    }
  }

  // Verifica si todas las opciones están seleccionadas
  areAllSelected(): boolean {
    return this.selectedTipos.length === this.tipos.length;
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


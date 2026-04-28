import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


interface Novedades {
  Titulo: string;
  Tipo: string;
  Multimedia?: any;
  EnlaceExterno?: string;
  Contenido: string;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit{
  novedades: Novedades[] = [];
  tipos: string[] = ['Noticia', 'Evento', 'Junta', 'Reunión', 'Otro'];
  selectedNovedad: string = '';
  searchTerm: string = '';
  BASE_URL = 'http://localhost:1337';
  selectedTipos: string[] = []; // Almacena los tipos seleccionados
  isDropdownOpen: boolean = false;
  sortOrder: 'desc' | 'asc' = 'desc';
  
  constructor(private http: HttpClient, private eRef: ElementRef) {}

  @ViewChild('dropdownRef') dropdownRef!: ElementRef;
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.dropdownRef && !this.dropdownRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  ngOnInit(): void {
    this.selectedTipos = [...this.tipos];

    this.http.get('http://localhost:1337/api/novedades?populate=*&sort=updatedAt:desc')
      .subscribe({
        next: (data: any) => {         
          this.novedades = data?.data || []; 
        },
        error: (error) => {
          console.error('Error fetching data from Strapi:', error);
        }
      });
  }

  get filteredNovedades(): Novedades[] {
    let result = this.novedades.filter(novedades => {
      const matchesTipo = this.selectedTipos.includes(novedades.Tipo);

      const matchesSearchTerm = this.searchTerm? (
          novedades.Titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          this.stripHtml(novedades.Contenido).toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : true;

      return matchesTipo && matchesSearchTerm;
    });

    // Aplica orden después de filtrar
    result = result.sort((a: any, b: any) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();

      return this.sortOrder === 'desc'
        ? dateB - dateA
        : dateA - dateB;
    });

    return result;
  }

  stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
  
  onSearchTermChange(): void {
    this.selectedNovedad = '';
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSort(): void {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
  }

  // Maneja los cambios en los checkboxes
  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      if (!this.selectedTipos.includes(target.value)) {
        this.selectedTipos.push(target.value);
      }
    } else {
      this.selectedTipos = this.selectedTipos.filter(tipo => tipo !== target.value);
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
        return 'linea-naranja';
      case 'Junta':
        return 'linea-morado';
      case 'Reunión':
        return 'linea-verde';
      case 'Otro':
        return 'linea-azul';
      default:
        return 'linea-azul';
    }
  }
}


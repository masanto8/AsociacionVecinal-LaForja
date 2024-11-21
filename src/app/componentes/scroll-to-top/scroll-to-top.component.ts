import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent {
  visible: boolean = false; // Para mostrar/ocultar el botón

  // Escucha el evento de scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Comprobamos la cantidad de desplazamiento y actualizamos la visibilidad
    if (window.scrollY > 100) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
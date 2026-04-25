import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent {
  buttonBottom: number = 25;
  visible: boolean = false; // Para mostrar/ocultar el botón
  footerVisible: boolean = false;
  // Escucha el evento de scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.visible = window.scrollY > 100;

    const footer = document.getElementById('main-footer');

    if (footer) {
      const rect = footer.getBoundingClientRect();
      const overlap = window.innerHeight - rect.top;

      if (overlap > 0) {
        // El footer está entrando → subimos el botón suavemente
        this.buttonBottom = overlap + 5; // 5px de margen
      } else {
        // Estado normal
        this.buttonBottom = 25;
      }
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
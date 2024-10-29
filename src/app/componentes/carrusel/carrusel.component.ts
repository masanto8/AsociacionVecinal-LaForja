import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css',

})
export class CarruselComponent {
  currentSlide = 0; // Estado del carrusel

  // Método para manejar el evento de cambio de slide
  onSlide(event: any) {
    this.currentSlide = event.active;
    console.log('Current Slide:', this.currentSlide);
  }

}

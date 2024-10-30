import { Component } from '@angular/core';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css',

})
export class CarruselComponent {
  currentSlide = 0; // Estado del carrusel

  // Método para manejar el evento de cambio de slide
  slides = [
    { img: 'assets/imagenes/infoCarrusel1.jpg', link: '/informacion', title: 'Infórmate', additional: 'Conóce las últimas noticias y nuestro trabajo' },
    { img: 'assets/imagenes/talleresCarrusel1.jpg', link: '/talleres', title: 'Talleres', additional: 'Descubre la variedad de talleres que promocionamos' },
    { img: 'assets/imagenes/juntaCarrusel1.jpg', link: '/junta', title: 'Junta Directiva', additional: 'Listado de nuestros miembros directivos' },
    { img: 'assets/imagenes/transparenciaCarrusel2.jpg', link: '/transparencia', title: 'Transparencia', additional: 'Desglose de nuestras subvenciones y gastos' },
    { img: 'assets/imagenes/asociacionCarrusel1.jpg', link: '/asociacion', title: 'Conócenos', additional: 'Conóce nuestra historia y cómo contactarnos' }
  ];

  onSlide(event: NgbSlideEvent) {
    this.currentSlide = parseInt(event.current.replace('ngb-slide-', ''), 10);
  }

}

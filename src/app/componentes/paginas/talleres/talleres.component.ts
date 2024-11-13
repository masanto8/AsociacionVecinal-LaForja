import { Component } from '@angular/core';


interface Talleres {
  Anyo: number;
  NombreTaller: string;
  Cartel: 'image/jpeg' | 'image/png' | 'application/pdf';
}
@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrl: './talleres.component.css'
})
export class TalleresComponent {

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './componentes/main-layout/main-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './componentes/paginas/inicio/inicio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AsociacionComponent } from './componentes/paginas/asociacion/asociacion.component';
import { InfoComponent } from './componentes/paginas/info/info.component';
import { TalleresComponent } from './componentes/paginas/talleres/talleres.component';
import { TransparenciaComponent } from './componentes/paginas/transparencia/transparencia.component';
import { JuntaComponent } from './componentes/paginas/junta/junta.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { ScrollToTopComponent } from './componentes/scroll-to-top/scroll-to-top.component';




@NgModule({
  declarations: [
    AppComponent, MainLayoutComponent, InicioComponent, AsociacionComponent, InfoComponent, TalleresComponent, CarruselComponent,
    TransparenciaComponent, JuntaComponent, ScrollToTopComponent,
    

    // Agrega más componentes según sea necesario
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgbCarouselModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
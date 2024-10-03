import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './componentes/main-layout/main-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './componentes/paginas/inicio/inicio.component';




@NgModule({
  declarations: [
    AppComponent, MainLayoutComponent, InicioComponent

    // Agrega más componentes según sea necesario
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
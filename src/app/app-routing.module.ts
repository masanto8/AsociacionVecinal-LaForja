import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/paginas/inicio/inicio.component';
import { AsociacionComponent } from './componentes/paginas/asociacion/asociacion.component';
import { InfoComponent } from './componentes/paginas/info/info.component';
import { TalleresComponent } from './componentes/paginas/talleres/talleres.component';
import { TransparenciaComponent } from './componentes/paginas/transparencia/transparencia.component';
import { JuntaComponent } from './componentes/paginas/junta/junta.component';
import { AdminRedirectComponent } from './componentes/admin-redirect/admin-redirect.component';



const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'novedades', component: InfoComponent },
  { path: 'talleres', component: TalleresComponent },
  { path: 'asociacion', component: AsociacionComponent },
  { path: 'transparencia', component: TransparenciaComponent },
  { path: 'junta', component: JuntaComponent },
  { path: 'admin', component: AdminRedirectComponent}

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // Restaura la posición al inicio
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

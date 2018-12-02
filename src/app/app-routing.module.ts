import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { InstalacionesComponent } from './components/instalaciones/instalaciones.component';
import { ReservarComponent } from './components/reservar/reservar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: "", component: InicioComponent },
  {path: "servicios", component: ServiciosComponent /*, canActivate: [AuthGuard]*/ },
  {path: "instalaciones", component: InstalacionesComponent },
  {path: "reservar", component: ReservarComponent },
  {path: "registro", component: RegistroComponent /* ,canActivate: [AuthGuard]*/ },
  {path: "login", component: LoginComponent /* ,canActivate: [AuthGuard]*/ },
  // {path: '**', component: NotFoundComponent },
];

@NgModule({
 // providers: [AuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

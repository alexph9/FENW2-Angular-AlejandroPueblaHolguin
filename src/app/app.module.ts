import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CarouselModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

//Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/commons/nav-bar/nav-bar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { InstalacionesComponent } from './components/instalaciones/instalaciones.component';
import { ReservarComponent } from './components/reservar/reservar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    InicioComponent,
    ServiciosComponent,
    InstalacionesComponent,
    ReservarComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    WavesModule.forRoot(), 
    ButtonsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

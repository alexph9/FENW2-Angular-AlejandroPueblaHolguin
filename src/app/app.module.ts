import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CarouselModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

//Services
import { AuthService } from './shared/services/auth/auth.service'
import { AuthGuard } from './shared/guards/auth/auth.guard';

//Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/commons/nav-bar/nav-bar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { InstalacionesComponent } from './components/instalaciones/instalaciones.component';
import { ReservarComponent } from './components/reservar/reservar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/commons/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    InicioComponent,
    ServiciosComponent,
    InstalacionesComponent,
    ReservarComponent,
    RegistroComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    WavesModule.forRoot(), 
    ButtonsModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule
  ],
  providers: [AuthService, AuthGuard, FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

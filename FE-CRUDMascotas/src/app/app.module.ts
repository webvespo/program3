import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modulos compartidos (Angular Material)
import { SharedModule } from './shared/shared.module';


//componentes
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DialogoComponent } from './components/dialogo/dialogo.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { DialogoMascotasComponent } from './components/dialogo-mascotas/dialogo-mascotas.component';
import { EditarMascotasComponent } from './components/editar-mascotas/editar-mascotas.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    LoginComponent,
    NavbarComponent,
    DialogoComponent,
    ReportesComponent,
    UsuariosComponent,
    MascotasComponent,
    DialogoMascotasComponent,
    EditarMascotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

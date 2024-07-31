import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { AppComponent } from './app.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';


const routes: Routes = [
  { path: '', component: AppComponent, children: [
    { path:'', component: LoginComponent},
    { path: 'inicio', component: InicioComponent},
    { path:'usuarios', component: UsuariosComponent},
    { path:'mascotas', component: MascotasComponent},
    { path:'reportes', component: ReportesComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full'},
  ] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

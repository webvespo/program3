import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListadoMascotaComponent } from './components/listado-mascota/listado-mascota.component';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardModule } from './components/dashboard/dashboard.module';

const routes: Routes = [
  //{ path: '', redirectTo: 'app-menu', pathMatch: 'full'},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  //{ path: 'app-menu', component: MenuComponent},
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule)},
  { path: 'listMascotas', component: ListadoMascotaComponent},
  { path: 'agregarMascota', component: AgregarEditarMascotaComponent},
  { path: 'verMascota/:id', component: VerMascotaComponent},
  { path: 'editarMascota/:id', component: AgregarEditarMascotaComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full'},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

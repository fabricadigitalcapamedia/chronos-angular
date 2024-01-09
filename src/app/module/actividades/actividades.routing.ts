import { Routes, RouterModule } from '@angular/router';
import { ActividadesComponent } from './actividades.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'actividades', 
  component: ActividadesComponent,
  data: {titulo: 'Actividades'} },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesRoutingModule { }

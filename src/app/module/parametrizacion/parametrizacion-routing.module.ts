import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectoComponent } from './partial/proyecto/proyecto.component';

const routes: Routes = [  
  {
    path: 'proyecto', 
    component: ProyectoComponent,
    data: {titulo: 'Proyecto'}   
  },
  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
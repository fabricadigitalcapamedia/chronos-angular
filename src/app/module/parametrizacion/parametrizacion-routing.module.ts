import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectoComponent } from './partial/proyecto/proyecto.component';
import { PerfilComponent } from './partial/perfil/perfil.component';
import { PerfilTipoComponent } from './partial/perfil-tipo/perfil-tipo.component';

const routes: Routes = [  
  {
    path: 'proyecto', 
    component: ProyectoComponent,
    data: {titulo: 'Proyecto'}   
  },
  {
    path: 'perfil', 
    component: PerfilComponent,
    data: {titulo: 'Perfil'}   
  },
  {
    path: 'perfilTipo', 
    component: PerfilTipoComponent,
    data: {titulo: 'Perfil Tipo'}   
  },
  
  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
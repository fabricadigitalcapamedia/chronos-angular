import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectoComponent } from './partial/proyecto/proyecto.component';
import { PerfilComponent } from './partial/perfil/perfil.component';
import { PerfilTipoComponent } from './partial/perfil-tipo/perfil-tipo.component';
import { PerfilNivelComponent } from './partial/perfil-nivel/perfil-nivel.component';
import { LineaProductoComponent } from './partial/linea-producto/linea-producto.component';
import { PerfilCostoComponent } from './partial/perfil-costo/perfil-costo.component';
import { TercerosComponent } from './partial/terceros/terceros.component';
import { TareaTipoComponent } from './partial/tarea-tipo/tarea-tipo.component';
import { TareaTipoEstadoComponent } from './partial/tarea-tipo-estado/tarea-tipo-estado.component';
import { TareaEstadosComponent } from './partial/tarea-estados/tarea-estados.component';

const routes: Routes = [
  {
    path: 'proyecto',
    component: ProyectoComponent,
    data: { titulo: 'Proyecto' }
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: { titulo: 'Perfil' }
  },
  {
    path: 'perfilTipo',
    component: PerfilTipoComponent,
    data: { titulo: 'Perfil Tipo' }
  },
  {
    path: 'perfilNivel',
    component: PerfilNivelComponent,
    data: { titulo: 'Perfil Nivel' }
  },
  {
    path: 'lineaProducto',
    component: LineaProductoComponent,
    data: { titulo: 'Linea Producto' }
  },
  {
    path: 'perfilCosto',
    component: PerfilCostoComponent,
    data: { titulo: 'Perfil Costo' }
  },
  {
    path: 'terceros',
    component: TercerosComponent,
    data: { titulo: 'Terceros' }
  },
  {
    path: 'tareaTipo',
    component: TareaTipoComponent,
    data: { titulo: 'Tarea Tipo' }
  },
  {
    path: 'tareaTipoEstado',
    component: TareaTipoEstadoComponent,
    data: { titulo: 'Tarea Tipo Estado' }
  },
  {
    path: 'tareaEstado',
    component: TareaEstadosComponent,
    data: { titulo: 'Tarea Estados' }
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimacionesComponent } from './partial/estimaciones/estimaciones.component';
import { HallazgosComponent } from './partial/hallazgos/hallazgos.component';
import { GerateJsonComponent } from './partial/gerate-json/gerate-json.component';
import { MenuComponent } from './partial/menu/menu.component';
import { AjusteComponent } from './partial/ajuste/ajuste.component';


const routes: Routes = [
  {
    path: 'demoaplicacion',
    component: GerateJsonComponent
  },
  {
    path: 'estimaciones',
    component: EstimacionesComponent
  },
  {
    path: 'hallazgos',
    component: HallazgosComponent,
  },
  {
    path: 'ajuste',
    component: AjusteComponent,
  },

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

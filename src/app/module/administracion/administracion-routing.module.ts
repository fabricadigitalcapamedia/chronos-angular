import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorComponent } from './partial/proveedor/proveedor.component';

const routes: Routes = [
  {
    path: 'proveedor',
    component: ProveedorComponent,
    data: { titulo: 'Proveedor' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }

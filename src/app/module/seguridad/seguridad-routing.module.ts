import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../seguridad/partial/login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  {
    path: 'login', 
    component: LoginComponent    
  },
  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }

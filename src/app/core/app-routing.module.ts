import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { MenuComponent } from '../module/home/partial/menu/menu.component';
import { LoginComponent } from '../module/seguridad/partial/login/login.component';
import { AutenticationService } from '../autentication.service';
import { GanttComponent } from '../shared/components/gantt/gantt.component';
import { CalendarComponent } from '../shared/components/calendar/calendar.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent, pathMatch: 'full',
    //canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AutenticationService).canActivateLogin()],
    data: {
      title: 'Login'
    }
  },

  {
    path: 'gannt', component: GanttComponent,
    //canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AutenticationService).canActivateLogin()],
    data: {
      title: 'gannt'
    }
  },
  {
    path: 'calendar', component: CalendarComponent,
    //canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AutenticationService).canActivateLogin()],
    data: {
      title: 'calendar'
    }
  },
  {
    path: 'home', component: MenuComponent,
    canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AutenticationService).canActivate()],
    data: {titulo: 'Home'},
    children: [
      {
        path: '',
        loadChildren: () => import('../module/home/home.module').then(m => m.HomeModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

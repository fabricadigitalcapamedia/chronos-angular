import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/design/header/header.component';
import { BreadcrumbsComponent } from './components/design/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/design/footer/footer.component';
import { SidebarComponent } from './components/design/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
  ],
})
export class SharedModule { }

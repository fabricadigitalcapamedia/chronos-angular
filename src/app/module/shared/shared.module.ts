import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './partial/header/header.component';
import { BreadcrumbsComponent } from './partial/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './partial/footer/footer.component';
import { SidebarComponent } from './partial/sidebar/sidebar.component';
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

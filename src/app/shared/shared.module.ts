import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/design/header/header.component';
import { BreadcrumbsComponent } from './components/design/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/design/footer/footer.component';
import { SidebarComponent } from './components/design/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule,DataTableDirective } from 'angular-datatables';
import { AgGridModule } from 'ag-grid-angular';
import { TemplateRenderComponent } from './components/grid-chronos/template-render/template-render.component';
import { GridChronosComponent } from './components/grid-chronos/grid-chronos.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    TemplateRenderComponent,
    GridChronosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,    
    AgGridModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    GridChronosComponent
  ],
})
export class SharedModule { }

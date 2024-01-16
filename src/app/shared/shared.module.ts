import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './components/design/header/header.component';
import { BreadcrumbsComponent } from './components/design/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/design/footer/footer.component';
import { SidebarComponent } from './components/design/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule,DataTableDirective } from 'angular-datatables';
import { AgGridModule } from 'ag-grid-angular';
import { TemplateRenderComponent } from './components/grid-chronos/template-render/template-render.component';
import { GridChronosComponent } from './components/grid-chronos/grid-chronos.component';
import { ToolbarComponent } from './components/design/toolbar/toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TareasPoputComponent } from './components/poputs/tareas/tareas.poput/tareas.poput.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    TemplateRenderComponent,
    GridChronosComponent,
    ToolbarComponent,
    TareasPoputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,    
    AgGridModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    MatSelectModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    GridChronosComponent,
    ToolbarComponent
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModule } from "../../shared/shared.module";
import {ProveedorComponent} from './partial/proveedor/proveedor.component'




import { AdministracionRoutingModule } from './administracion-routing.module';


@NgModule({
  declarations: [
    ProveedorComponent

  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    BsDatepickerModule.forRoot(),
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    CommonModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    TabsModule.forRoot(),
    MatTabsModule,
    RouterModule,
    SharedModule,
    NgbAlertModule, 
    NgbDatepickerModule
  ]
})
export class AdministracionModule { }

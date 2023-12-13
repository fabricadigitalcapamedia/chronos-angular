import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoComponent } from './partial/proyecto/proyecto.component';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TabsModule } from 'ngx-bootstrap/tabs'; 
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { ParametrizacionRoutingModule } from './parametrizacion-routing.module';
import { SharedModule } from "../../shared/shared.module";

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';






@NgModule({
    declarations: [
        ProyectoComponent
    ],
    exports: [],
    imports: [
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
        NgbTypeaheadModule,
        FormsModule,
        MdbAccordionModule,
        TabsModule.forRoot(),
        MatTabsModule,
        RouterModule,
        ParametrizacionRoutingModule,
        SharedModule
    ]
})
export class ParametrizacionModule { }

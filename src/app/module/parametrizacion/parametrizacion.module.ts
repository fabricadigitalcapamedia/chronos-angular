import { NgModule,Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoComponent } from './partial/proyecto/proyecto.component';
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
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { ParametrizacionRoutingModule } from './parametrizacion-routing.module';
import { SharedModule } from "../../shared/shared.module";

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { PerfilComponent } from './partial/perfil/perfil.component';
import { PerfilTipoComponent } from './partial/perfil-tipo/perfil-tipo.component';
import { PerfilNivelComponent } from './partial/perfil-nivel/perfil-nivel.component';
import { LineaProductoComponent } from './partial/linea-producto/linea-producto.component';
import { PerfilCostoComponent } from './partial/perfil-costo/perfil-costo.component';
import { TercerosComponent } from './partial/terceros/terceros.component';
import { TareaTipoComponent } from './partial/tarea-tipo/tarea-tipo.component';
import { TareaTipoEstadoComponent } from './partial/tarea-tipo-estado/tarea-tipo-estado.component';


@NgModule({
    declarations: [
        ProyectoComponent,
        PerfilComponent,
        PerfilTipoComponent,
        PerfilNivelComponent,
        LineaProductoComponent,
        PerfilCostoComponent,
        TercerosComponent,
        TareaTipoComponent,
        TareaTipoEstadoComponent
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

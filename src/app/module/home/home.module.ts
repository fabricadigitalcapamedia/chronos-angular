import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { EstimacionesComponent } from './partial/estimaciones/estimaciones.component';
import { HallazgosComponent } from './partial/hallazgos/hallazgos.component';
import { MenuComponent } from './partial/menu/menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalJsonComponent } from './partial/modal-json/modal-json.component';
import { GerateJsonComponent } from './partial/gerate-json/gerate-json.component';
import { FormsModule } from '@angular/forms';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MatMenuModule } from '@angular/material/menu';
import { TabsModule } from 'ngx-bootstrap/tabs'; 
import {MatTabsModule} from '@angular/material/tabs';
import { AjusteComponent } from './partial/ajuste/ajuste.component';
import { SharedModule } from '../../../app/shared/shared.module';

import { RouterModule } from '@angular/router';
import { ParametrizacionModule } from '../parametrizacion/parametrizacion.module';



@NgModule({
  declarations: [
    EstimacionesComponent,
    HallazgosComponent,
    MenuComponent,
    GerateJsonComponent,
    ModalJsonComponent,
    AjusteComponent
  ],
  imports: [
    MatMenuModule,
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    NgbTypeaheadModule,
    FormsModule,
    MdbAccordionModule,
    TabsModule.forRoot(),
    MatTabsModule,
    SharedModule,
    ParametrizacionModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    AjusteComponent
  ],
})
export class HomeModule { }

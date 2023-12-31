import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { GerateJsonComponent } from './module/home/partial/gerate-json/gerate-json.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { HttpClientModule } from '@angular/common/http';

import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './module/seguridad/partial/login/login.component';
import { RouterModule } from '@angular/router';
import { AutenticationService } from './autentication.service';
import { GanttComponent } from './basico/gantt/gantt.component';
import { NgxGanttModule } from '@worktile/gantt';
import { MatMenuModule } from '@angular/material/menu';
import { TabsModule } from 'ngx-bootstrap/tabs';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GanttComponent,   
  ],
  imports: [
    MatMenuModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MdbAccordionModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatSidenavModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    RouterModule,
    NgxGanttModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right', closeButton: true, timeOut: 6000, progressBar: true, preventDuplicates: true }), // Configura ToastrModule
     
  ],
  providers: [AutenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

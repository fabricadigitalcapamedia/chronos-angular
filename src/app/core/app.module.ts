import { NgModule,Component,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { GerateJsonComponent } from '../module/home/partial/gerate-json/gerate-json.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from '../module/seguridad/partial/login/login.component';
import { RouterModule } from '@angular/router';
import { AutenticationService } from '../autentication.service';
import { GanttComponent } from '../shared/components/gantt/gantt.component';
import { NgxGanttModule } from '@worktile/gantt';
import { MatMenuModule } from '@angular/material/menu';
import { TabsModule } from 'ngx-bootstrap/tabs'; 
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from '../shared/components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';


import LocaleEsCo from '@angular/common/locales/es-CO';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
defineLocale('es', esLocale);


export const httpInterceptors = [
  { provide: LocationStrategy, useClass: HashLocationStrategy }
];





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GanttComponent,
    CalendarComponent,
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
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      serverLoggingUrl: 'http://localhost:4200/',
      disableConsoleLogging: false 
    }),
    BrowserAnimationsModule,
    FullCalendarModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    MatNativeDateModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  providers: [AutenticationService,httpInterceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { FormsModule } from '@angular/forms';

import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TabsModule } from 'ngx-bootstrap/tabs'; 
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatIconModule,
    FormsModule,
    TabsModule.forRoot(),
    MatTabsModule
  ]
})
export class SeguridadModule { }

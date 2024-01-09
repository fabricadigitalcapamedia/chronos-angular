import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-perfil-costo',
  templateUrl: './perfil-costo.component.html',
  styleUrl: './perfil-costo.component.css'
})
export class PerfilCostoComponent implements OnInit{

  constructor(){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

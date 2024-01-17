import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { TercerosService } from '../../service/terceros.service';

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.css'
})
export class TercerosComponent implements OnInit {

  @ViewChild('form', { static: true }) Form?: NgForm;


  toolbarButton: any = {};
  gridDataTercero: GridOptions;
  column?: any[];
  rowData: any;
  DatosTercero: any = {};
  user = localStorage.getItem('user');
  verGrid: boolean = true;
  validate: boolean = false;
  idTercero: any = {};

  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this),
      cellRendererParams: { edit: 'Editar' },
      width: 150
    },
    { field: "nombre", headerName: 'Nombre', width: 650 },
    { field: "nit", headerName: 'Nit', width: 350 },
    { field: "telefono", headerName: 'Telefono', width: 250 }
  ];

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private terceroService: TercerosService) {
    this.gridDataTercero = {
      context: (api: GridApi) => {
      },
      rowSelection: 'multiple'
      , pagination: false
      , singleClickEdit: false
      , enableCellTextSelection: false 
    }

    this.toolbarButton = {
      save: () => {
        this.save();
      },
      new: () => {
        this.clear();
      },
      filter: () => {
        this.filtrar();
      },
      editShow: false,
      saveShow: false,
      deleteShow: false,
      newShow: false,
      filterShow: false
    }
  }

  ngOnInit(): void {
    this.fnLoad();
  }

  clear() {
    this.verGrid = false;
    this.router.navigate([], { queryParams: {} });
    this.DatosTercero = {};
    this.idTercero = {};
    this.activationButtons();
  }

  filtrar() {
    this.verGrid = true;
    this.router.navigate([], { queryParams: {} });
    this.idTercero = {};
    this.activationButtons();
  }

  getTercero() {
    this.gridDataTercero.api?.setColumnDefs([]);
    this.gridDataTercero.api?.setRowData([]);
    this.terceroService.getTercero(this.user).subscribe({
      next: (data) => {          
        this.gridDataTercero.api?.setColumnDefs(this.colDefs)
        this.gridDataTercero.api?.setRowData(data.data);
        this.activationButtons();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  getTerceroXid(id: number) {
    this.terceroService.getTerceroXid(this.user, id).subscribe({
      next: (data) => {
        this.DatosTercero = data.data;
        this.activationButtons();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    });
  }

  save() {
    if (!this.Form?.valid) {
      this.validate = true
      this.toastr.warning('Debe diligenciar los campos remarcados en rojo');
    }
    else {
      let data: any = { ...this.DatosTercero };
      this.getTercero();
      if (this.DatosTercero.id) {
        this.update(data);
      } else {
        data.codtercerotipo = 1;
        this.create(data);
      }
    }
  }

  create(data: any) {
    this.terceroService.createTercero(this.user, data).subscribe({
      next: (data) => {
        this.DatosTercero = data.data;
        this.router.navigate([], { queryParams: { idTercero: this.DatosTercero.id } });
        this.activationButtons();
        this.toastr.success(data.mensaje);
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.');
      }
    });
  }

  update(data: any) {
    this.terceroService.updateTercero(this.user, data).subscribe({
      next: (data) => {
        this.toastr.success(data.mensaje);
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  handleEditClick(event: any): void {
    var nuevoArray = event.eventPath[0].id;
    if (nuevoArray == 'edit') {
      this.DatosTercero = event.data;
      this.verGrid = false;
      this.router.navigate([], { queryParams: { idTercero: this.DatosTercero.id } });
      this.idTercero = this.route.snapshot.queryParams;
      this.activationButtons();
    }
  };

  activationButtons() {
    if (this.verGrid) {
      this.toolbarButton.saveShow = false;
      this.toolbarButton.filterShow = false;
      this.toolbarButton.deleteShow = false;
      this.toolbarButton.newShow = true;
    } else {
      this.toolbarButton.saveShow = true;
      this.toolbarButton.filterShow = true;
      this.toolbarButton.newShow = true;
    }
  }

  fnLoad() {
    this.idTercero = this.route.snapshot.queryParams;
    if (this.idTercero?.idTercero) {
      this.getTerceroXid(parseInt(this.idTercero.idTercero));
      this.verGrid = false;
    }
    else {
      this.getTercero();
    }
  }

}

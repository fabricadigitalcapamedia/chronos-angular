import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProveedorService } from '../../service/proveedor.service';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent implements OnInit {

  @ViewChild('form', { static: true }) Form?: NgForm;

  toolbarButton: any = {};
  gridDataProveedor: GridOptions;
  column?: any[];
  rowData: any;
  DatosProveedor: any = {};
  user = localStorage.getItem('user');
  verGrid: boolean = true;
  validate: boolean = false;
  idProveedor: any = {};

  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this),
      cellRendererParams: { edit: 'Editar' },
      width: 100
    },
    { field: "nit", headerName: 'Nit', width: 180 },
    { field: "nombre", headerName: 'Nombre', width: 400 },
    { field: "contratomarco", headerName: 'Marco', width: 180 },
    { field: "especialidad", headerName: 'Especialidad', width: 250 },
    { field: "linea", headerName: 'Línea', width: 180 },
  ];

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private proveedorService: ProveedorService) {

    this.gridDataProveedor = {
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
    this.DatosProveedor = {};
    this.validacionDatos();
    this.idProveedor = {};
    this.activationButtons();
  }
  filtrar() {
    this.verGrid = true;
    this.router.navigate([], { queryParams: {} });
    this.idProveedor = {};
    this.getProveedor();
  }

  getProveedor() {
    this.proveedorService.getProveedor(this.user).subscribe({
      next: (data) => {
        this.gridDataProveedor.api?.setColumnDefs(this.colDefs);
        this.gridDataProveedor.api?.setRowData(data.data);
        this.activationButtons();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  getProveedorXid(id: number) {
    this.proveedorService.getProveedorXid(this.user, id).subscribe({
      next: (data) => {
        this.DatosProveedor = data.data;
        this.activationButtons();
        this.validacionDatos();
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
      let data: any = { ...this.DatosProveedor };
      if (this.DatosProveedor.id) {
        this.update(data);
      } else {
        this.create(data);
      }
    }
  }

  create(data: any) {
    this.proveedorService.createProveedor(this.user, data).subscribe({
      next: (data) => {
        this.DatosProveedor = data.data;
        this.router.navigate([], { queryParams: { idProveedor: this.DatosProveedor.id } });
        this.activationButtons();
        this.toastr.success(data.mensaje);
      },
      error: (error) => {
        this.toastr.error('error al guardar intente nuevamente.');
      }
    });
  }

  update(data: any) {
    this.proveedorService.updateProveedor(this.user, data).subscribe({
      next: (data) => {
        this.toastr.success(data.mensaje);
      },
      error: (error) => {
        this.toastr.error('error al actualizar intente nuevamente.')
      }
    })
  }

  validacionDatos() {
    this.DatosProveedor.pais = this.DatosProveedor.pais === null || this.DatosProveedor.pais === undefined? 'Colombia' : this.DatosProveedor.pais;
    this.DatosProveedor.departamento = this.DatosProveedor.departamento === null || this.DatosProveedor.departamento === undefined ? 'Cundinamarca' : this.DatosProveedor.departamento;
    this.DatosProveedor.ciudad = this.DatosProveedor.ciudad === null || this.DatosProveedor.ciudad === undefined ? 'Bogota' : this.DatosProveedor.ciudad;

  }

  handleEditClick(event: any): void {
    var nuevoArray = event.eventPath[0].id;
    if (nuevoArray == 'edit') {
      this.DatosProveedor = event.data;
      this.validacionDatos();
      this.verGrid = false;
      this.router.navigate([], { queryParams: { idProveedor: this.DatosProveedor.id } });
      this.idProveedor = this.route.snapshot.queryParams;
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
    this.idProveedor = this.route.snapshot.queryParams;
    if (this.idProveedor?.idProveedor) {
      this.getProveedorXid(parseInt(this.idProveedor.idProveedor));
      this.verGrid = false;
    }
    else {
      this.getProveedor();
    }
  }


}

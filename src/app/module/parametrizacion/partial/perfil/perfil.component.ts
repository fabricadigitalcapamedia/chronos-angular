import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PerfilService } from '../../service/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  @ViewChild('form', { static: true }) Form?: NgForm;

  toolbarButton: any = {};
  gridDataPerfil: GridOptions;
  column?: any[];
  rowData: any;
  DatosPerfil: any = {};
  user = localStorage.getItem('user');
  verGrid: boolean = true;
  validate: boolean = false;
  idPerfil: any = {};

  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this),
      cellRendererParams: { edit: 'Editar' },
      width: 120
    },
    { field: "nombre", headerName: 'Nombre', width: 850 },
    { field: "estado", headerName: 'Estado', width: 230 }
  ];


  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private perfilService: PerfilService) {

    this.gridDataPerfil = {
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
    this.DatosPerfil = {};
    this.idPerfil = {};
    this.activationButtons();
  }

  filtrar() {
    this.verGrid = true;
    this.router.navigate([], { queryParams: {} });
    this.idPerfil = {};
    this.getPerfil();
  }


  handleEditClick(event: any): void {
    var nuevoArray = event.eventPath[0].id;
    if (nuevoArray == 'edit') {
      this.DatosPerfil = event.data;
      this.verGrid = false;
      this.router.navigate([], { queryParams: { idPerfil: this.DatosPerfil.id } });
      this.idPerfil = this.route.snapshot.queryParams;
      this.activationButtons();
    }
  };

  getPerfil() {
    this.perfilService.getPerfil(this.user).subscribe({
      next: (data) => {        
        this.gridDataPerfil.api?.setColumnDefs(this.colDefs);
        this.gridDataPerfil.api?.setRowData(data.data);
        this.activationButtons();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  getPerfilXid(id: number) {
    this.perfilService.getPerfilXid(this.user, id).subscribe((response) => {
      if (response.data) {
        this.DatosPerfil = response.data;
        this.activationButtons();
      }
      else {
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
      let data: any = { ...this.DatosPerfil };
      if (this.DatosPerfil.id) {
        this.update(data);
      } else {
        this.create(data);
      }
    }
  }

  create(data: any) {
    data.estado = 'A';
    this.perfilService.createPerfil(this.user, data).subscribe({
      next: (data) => {
        this.DatosPerfil = data.data;
        this.router.navigate([], { queryParams: { idPerfil: this.DatosPerfil.id } });
        this.activationButtons();
        this.toastr.success(data.mensaje);
      }, error: (error) => {
        this.toastr.error('error de conexion con el servidor.');
      }
    });
  }

  update(data: any) {
    this.perfilService.updatePerfil(this.user, data).subscribe({
      next: (data) => {
        this.toastr.success(data.mensaje);
      }, error: (error) => {
        this.toastr.error('error de conexion con el servidor.');
      }
    });
  }

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
    this.idPerfil = this.route.snapshot.queryParams;
    if (this.idPerfil?.idPerfil) {
      this.getPerfilXid(parseInt(this.idPerfil.idPerfil));
      this.verGrid = false;
    }
    else {
      this.getPerfil();
    }
  }


}

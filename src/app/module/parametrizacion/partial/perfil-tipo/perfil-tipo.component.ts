import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PerfilTipoService } from '../../service/perfil-tipo.service';

@Component({
  selector: 'app-perfil-tipo',
  templateUrl: './perfil-tipo.component.html',
  styleUrl: './perfil-tipo.component.css'
})
export class PerfilTipoComponent implements OnInit {
  @ViewChild('form', { static: true }) Form?: NgForm;

  toolbarButton: any = {};
  gridDataPerfil: GridOptions;
  column?: any[];
  rowData: any;
  DatosPerfil: any = {};
  user = localStorage.getItem('user');
  verGrid: boolean = true;
  validate: boolean = false;
  idPerfilTipo: any = {};

  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this),
      cellRendererParams: { edit: 'Editar' },
      width: 100
    },
    { field: "nombre", headerName: 'Nombre', width: 900 }
  ];
  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private perfilTipoService: PerfilTipoService) {
    this.gridDataPerfil = {
      context: (api: GridApi) => {
        api.setColumnDefs(this.colDefs)
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


  getPerfilTpo() {
    this.perfilTipoService.getPerfilTipo(this.user).subscribe({
      next: (data) => {
        this.gridDataPerfil.api?.setRowData(data.data);
        this.activationButtons();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  getPerfilXid(id: number) {
    this.perfilTipoService.getPerfilTipoXid(this.user, id).subscribe({
      next: (data) => {
        this.DatosPerfil = data.data;
        this.activationButtons();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    });
  }


  clear() {
    this.verGrid = false;
    this.router.navigate([], { queryParams: {} });
    this.DatosPerfil = {};
    this.idPerfilTipo = {};
    this.activationButtons();
  }

  filtrar() {
    this.verGrid = true;
    this.router.navigate([], { queryParams: {} });
    this.idPerfilTipo = {};
    this.getPerfilTpo();
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
    this.perfilTipoService.updatePerfilTipo(this.user, data).subscribe({
      next: (data) => {
        this.DatosPerfil.id = data.data.id;
        this.router.navigate([], { queryParams: { idPerfilTipo: this.DatosPerfil.id } });
        this.activationButtons();
        this.toastr.success(data.mensaje);
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.');
      }
    });
  }
  
  update(data: any) {
    this.perfilTipoService.createPerfilTipo(this.user, data).subscribe({
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
      this.DatosPerfil = event.data;
      this.verGrid = false;
      this.router.navigate([], { queryParams: { idPerfilTipo: this.DatosPerfil.id } });
      this.idPerfilTipo = this.route.snapshot.queryParams;
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
    this.idPerfilTipo = this.route.snapshot.queryParams;
    if (this.idPerfilTipo?.idPerfilTipo) {
      this.getPerfilXid(parseInt(this.idPerfilTipo.idPerfilTipo));
      this.verGrid = false;
    }
    else {
      this.getPerfilTpo();
    }
  }

}

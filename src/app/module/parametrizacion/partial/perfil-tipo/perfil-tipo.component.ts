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
  idPerfil: any = {};

  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this),
      cellRendererParams: { edit: 'Editar' },
      width: 80
    },
    { field: "nombre", headerName: 'Nombre', width: 800 },
    { field: "estado", headerName: 'Estado', width: 150 }
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

  clear() { }

  filtrar() { }

  save() {if (!this.Form?.valid) {
    this.validate = true
    this.toastr.warning('Debe diligenciar los campos remarcados en rojo');
  }
  else {
    let data: any = { ...this.DatosPerfil };
    if (this.DatosPerfil.id) {
      this.perfilTipoService.updatePerfilTipo(this.user, data).subscribe((response) => {
        this.toastr.success(response.mensaje);
      });

    } else {
      data.estado = 'A';
      this.perfilTipoService.createPerfilTipo(this.user, data).subscribe((response) => {
        this.DatosPerfil.id = response.data.id;
        this.router.navigate([], { queryParams: { idProyecto: this.DatosPerfil.id } });
        this.activationButtons();
        this.toastr.success(response.mensaje);
      });
    }
  } }

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

  fnLoad() { }

}

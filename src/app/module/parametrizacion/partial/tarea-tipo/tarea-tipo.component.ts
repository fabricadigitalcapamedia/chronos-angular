import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TareaTipoService } from '../../service/tarea-tipo.service';

@Component({
  selector: 'app-tarea-tipo',
  templateUrl: './tarea-tipo.component.html',
  styleUrl: './tarea-tipo.component.css'
})
export class TareaTipoComponent implements OnInit {

  @ViewChild('form', { static: true }) Form?: NgForm;

  toolbarButton: any = {};
  gridDataTareaTipo: GridOptions;
  column?: any[];
  rowData: any;
  DatosTareaTipo: any = {};
  user = localStorage.getItem('user');
  verGrid: boolean = true;
  validate: boolean = false;
  idTareaTipo: any = {};

  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this),
      cellRendererParams: { edit: 'Editar' },
      width: 100
    },
    { field: "nombre", headerName: 'Nombre', width: 300 },
    { field: "descripcion", headerName: 'Descripción', width: 450 },
    { field: "jerarquia", headerName: 'Jerarquía', width: 100 },
    { field: "color", headerName: 'Color', width: 90 },
    { field: "fechacreacion", headerName: 'Fecha Creación', width: 160 },
    { field: "fechamodificacion", headerName: 'Fecha Modificación', width: 160 },
  ];

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private tareaTipoService: TareaTipoService) {
    this.gridDataTareaTipo = {
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
    this.tareaTipoService.getTareaTipo(this.user).subscribe({
      next: (data) => {
        data.data.forEach((element: any) => {
          element.fechacreacion = this.formatFecha(element.fechacreacion);
          element.fechamodificacion = this.formatFecha(element.fechamodificacion);
        });
        this.gridDataTareaTipo.api?.setRowData(data.data);
        this.activationButtons();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  getPerfilXid(id: number) {
    this.tareaTipoService.getTareaTipoXid(this.user, id).subscribe({
      next: (data) => {
        this.DatosTareaTipo = data.data;
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
    this.DatosTareaTipo = {};
    this.idTareaTipo = {};
    this.activationButtons();
  }

  filtrar() {
    this.verGrid = true;
    this.router.navigate([], { queryParams: {} });
    this.idTareaTipo = {};
    this.getPerfilTpo();
  }

  save() {
    if (!this.Form?.valid) {
      this.validate = true
      this.toastr.warning('Debe diligenciar los campos remarcados en rojo');
    }
    else {
      let data: any = { ...this.DatosTareaTipo };
      if (this.DatosTareaTipo.id) {
        this.update(data);
      } else {
        this.create(data);
      }
    }
  }


  create(data: any) {
    this.tareaTipoService.createTareaTipo(this.user, data).subscribe({
      next: (data) => {
        this.DatosTareaTipo = data.data;
        this.router.navigate([], { queryParams: { idTareaTipo: this.DatosTareaTipo.id } });
        this.activationButtons();
        this.toastr.success(data.mensaje);
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.');
      }
    });
  }

  update(data: any) {
    data.fechamodificacion = typeof data.fechamodificacion === 'number' ? data.fechamodificacion : this.convertirAFecha(data.fechamodificacion);
    data.fechacreacion = typeof data.fechacreacion === 'number' ? data.fechacreacion : this.convertirAFecha(data.fechacreacion);
    this.tareaTipoService.updateTareaTipo(this.user, data).subscribe({
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
      this.DatosTareaTipo = event.data;
      this.verGrid = false;
      this.router.navigate([], { queryParams: { idTareaTipo: this.DatosTareaTipo.id } });
      this.idTareaTipo = this.route.snapshot.queryParams;
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

  formatFecha(fecharec: any) {
    if (typeof fecharec === 'number') {
      const fecha = new Date(fecharec);
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // ¡Recuerda que los meses comienzan desde 0!
      const anio = fecha.getFullYear();
      fecharec = `${dia}/${mes}/${anio}`;
    }
    return fecharec;
  }

  convertirAFecha(fechaString: string): Date {
    const partesFecha = fechaString.split('/');
    return new Date(parseInt(partesFecha[2]), parseInt(partesFecha[1]) - 1, parseInt(partesFecha[0]));
  }

  fnLoad() {
    this.idTareaTipo = this.route.snapshot.queryParams;
    if (this.idTareaTipo?.idTareaTipo) {
      this.getPerfilXid(parseInt(this.idTareaTipo.idTareaTipo));
      this.verGrid = false;
    }
    else {
      this.getPerfilTpo();
    }
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TareaTipoEstadoService } from '../../service/tarea-tipo-estado.service';

@Component({
  selector: 'app-tarea-tipo-estado',
  templateUrl: './tarea-tipo-estado.component.html',
  styleUrl: './tarea-tipo-estado.component.css'
})
export class TareaTipoEstadoComponent implements OnInit {

  @ViewChild('form', { static: true }) Form?: NgForm;

  toolbarButton: any = {};
  gridDataTarTipEst: GridOptions;
  column?: any[];
  rowData: any;
  DatosTarTipEst: any = {};
  user = localStorage.getItem('user');
  verGrid: boolean = true;
  validate: boolean = false;
  idTareaTipEst: any = {};



  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this),
      cellRendererParams: { edit: 'Editar' },
      width: 100
    },
    { field: "nombre", headerName: 'Nombre', width: 200 },
    { field: "descripcion", headerName: 'Descripción', width: 600 },
    { field: "fechacreacion", headerName: 'Fecha Creación', width: 150 },
    { field: "fechamodificacion", headerName: 'Fecha Modificación', width: 150 },
  ];

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private tareaTipoEstado: TareaTipoEstadoService) {
    this.gridDataTarTipEst = {
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

  clear() {
    this.verGrid = false;
    this.router.navigate([], { queryParams: {} });
    this.DatosTarTipEst = {};
    this.idTareaTipEst = {};
    this.activationButtons();
  }

  filtrar() {
    this.verGrid = true;
    this.router.navigate([], { queryParams: {} });
    this.idTareaTipEst = {};
    this.getTareTipEst();
  }

  getTareTipEst() {
    this.tareaTipoEstado.getTareTipEst(this.user).subscribe({
      next: (data) => {
        data.data.forEach((element: any) => {
          element.fechacreacion = this.formatFecha(element.fechacreacion);
          element.fechamodificacion = this.formatFecha(element.fechamodificacion);
        });
        this.gridDataTarTipEst.api?.setRowData(data.data);
        this.activationButtons();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  getTareTipEstXid(id: number) {
    this.tareaTipoEstado.getTareTipEstXid(this.user, id).subscribe({
      next: (data) => {        
        this.DatosTarTipEst = data.data;
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
      let data: any = { ...this.DatosTarTipEst };
      if (this.DatosTarTipEst.id) {
        this.update(data);
      } else {
        this.create(data);
      }
    }
  }

  create(data: any) {
    this.tareaTipoEstado.createTareTipEst(this.user, data).subscribe({
      next: (data) => {
        this.DatosTarTipEst = data.data;
        this.router.navigate([], { queryParams: { idTareaTipEst: this.DatosTarTipEst.id } });
        this.activationButtons();
        this.toastr.success(data.mensaje);
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.');
      }
    });
  }

  update(data: any) {
    this.tareaTipoEstado.updateTareTipEst(this.user, data).subscribe({
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
      this.DatosTarTipEst = event.data;
      this.verGrid = false;
      this.router.navigate([], { queryParams: { idTareaTipEst: this.DatosTarTipEst.id } });
      this.idTareaTipEst = this.route.snapshot.queryParams;
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

  fnLoad() {
    this.idTareaTipEst = this.route.snapshot.queryParams;
    if (this.idTareaTipEst?.idTareaTipEst) {
      this.getTareTipEstXid(parseInt(this.idTareaTipEst.idTareaTipEst));
      this.verGrid = false;
    }
    else {
      this.getTareTipEst();
    }
  }

}

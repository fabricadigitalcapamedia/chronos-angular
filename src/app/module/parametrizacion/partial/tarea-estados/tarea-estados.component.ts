import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { TareaEstadosService } from '../../service/tarea-estados.service';
import { TareaTipoEstadoService } from '../../service/tarea-tipo-estado.service';
import { Observable, map, startWith } from 'rxjs';
import { ValidationService } from '../../../../service/validation.service';

@Component({
  selector: 'app-tarea-estados',
  templateUrl: './tarea-estados.component.html',
  styleUrl: './tarea-estados.component.css'
})
export class TareaEstadosComponent implements OnInit {

  @ViewChild('form', { static: true }) Form?: NgForm;

  toolbarButton: any = {};
  gridDataTarEst: GridOptions;
  column?: any[];
  rowData: any;
  DatosTarEst: any = {};
  user = localStorage.getItem('user');
  verGrid: boolean = true;
  validate: boolean = false;
  idTarEst: any = {};

  tipoEstFilterCtrl = new FormControl();
  filteredTipo?: Observable<any>;
  DataTipoEst: any = {};

  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this),
      cellRendererParams: { edit: 'Editar' },
      width: 100
    },
    { field: "nombre", headerName: 'Nombre', width: 170 },
    { field: "descripcion", headerName: 'Descripción', width: 650 },
    { field: "fechacreacion", headerName: 'Fecha Creación', width: 180 },
    { field: "fechamodificacion", headerName: 'Fecha Modificación', width: 180 },
  ];

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private tareaEstadoService: TareaEstadosService,
    private validationService: ValidationService,private tareaTipoEstado: TareaTipoEstadoService) {

    this.gridDataTarEst = {
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
    this.DatosTarEst = {};
    this.idTarEst = {};
    this.activationButtons();
  }

  filtrar() {
    this.verGrid = true;
    this.router.navigate([], { queryParams: {} });
    this.idTarEst = {};
    this.getTarEstado();
  }

  filtrardataTipo() {
    this.filteredTipo = this.tipoEstFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterTipo(value))
    );
  }

  filterTipo(value: string): any[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.DataTipoEst.filter((tipo: any) => tipo.nombre.toLowerCase().includes(filterValue));
    }
    else {
      const filterValue = parseInt(value);
      return this.DataTipoEst.filter((tipo: any) => tipo.id === filterValue);
    }
  }

  getTareTipEst() {
    this.tareaTipoEstado.getTareTipEst(this.user).subscribe({
      next: (data) => {
        this.DataTipoEst = data.data;
        this.filtrardataTipo();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  
  getTarEstado() {
    this.tareaEstadoService.getTarEst(this.user).subscribe({
      next: (data) => {      
        data.data.forEach((element: any) => {
          element.fechacreacion = this.validationService.formatFecha(element.fechacreacion);
          element.fechamodificacion = this.validationService.formatFecha(element.fechamodificacion);
        });  
        this.gridDataTarEst.api?.setRowData(data.data);
        this.activationButtons();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  getTareaEstadoXid(id: number) {
    this.tareaEstadoService.getTarEstXid(this.user, id).subscribe((response) => {
      if (response.data) {        
        this.DatosTarEst = response.data;
        this.filterTipo(this.DatosTarEst.codtareaestadotipo);
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
      let data: any = { ...this.DatosTarEst };
      if (this.DatosTarEst.id) {
        this.update(data);
      } else {
        this.create(data);
      }
    }
  }

  create(data: any) {
    data.estado = 'A';
    this.tareaEstadoService.createTarEst(this.user, data).subscribe({
      next: (data) => {
        this.DatosTarEst = data.data;
        this.router.navigate([], { queryParams: { idTarEst: this.DatosTarEst.id } });
        this.activationButtons();
        this.toastr.success(data.mensaje);
      }, error: (error) => {
        this.toastr.error('error de conexion con el servidor.');
      }
    });
  }

  update(data: any) {
    data.fechamodificacion = typeof data.fechamodificacion === 'number' ? data.fechamodificacion : this.validationService.convertirAFecha(data.fechamodificacion);
    data.fechacreacion = typeof data.fechacreacion === 'number' ? data.fechacreacion : this.validationService.convertirAFecha(data.fechacreacion);
    
    this.tareaEstadoService.updateTarEst(this.user, data).subscribe({
      next: (data) => {
        this.toastr.success(data.mensaje);
      }, error: (error) => {
        this.toastr.error('error de conexion con el servidor.');
      }
    });
  }


  handleEditClick(event: any): void {
    var nuevoArray = event.eventPath[0].id;
    if (nuevoArray == 'edit') {
      this.DatosTarEst = event.data;
      this.verGrid = false;
      this.router.navigate([], { queryParams: { idTarEst: this.DatosTarEst.id } });
      this.idTarEst = this.route.snapshot.queryParams;
      this.filterTipo(this.DatosTarEst.codtareaestadotipo);
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
    this.idTarEst = this.route.snapshot.queryParams;
    this.getTareTipEst();
    if (this.idTarEst?.idTarEst) {
      this.getTareaEstadoXid(parseInt(this.idTarEst.idTarEst));
      this.verGrid = false;
    }
    else {
      this.getTarEstado();
    }
  }


}


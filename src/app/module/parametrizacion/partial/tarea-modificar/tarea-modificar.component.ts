import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { TareaModificarService } from '../../service/tarea-modificar.service';
import { ValidationService } from '../../../../service/validation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tarea-modificar',
  templateUrl: './tarea-modificar.component.html',
  styleUrl: './tarea-modificar.component.css'
})
export class TareaModificarComponent implements OnInit {

  @ViewChild('form', { static: true }) Form?: NgForm;
  toolbarButton: any = {};
  gridDataTarMod: GridOptions;
  column?: any[];
  rowData: any;
  DatosTarMod: any = {};
  user = localStorage.getItem('user');
  verGrid: boolean = true;
  validate: boolean = false;
  idTarMod: any = {};

  coordFilterCtrl = new FormControl();
  filteredCoord?: Observable<any>;
  DataCoord: any = {};

  proyectoFilterCtrl = new FormControl();
  filteredProyecto?: Observable<any>;
  DataProyecto: any = {};


  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this),
      cellRendererParams: { edit: 'Editar' },
      width: 80,
    },
    { field: "nombre", headerName: 'Nombre', width: 200 },
    { field: "descripcion", headerName: 'Descripción', width: 450 },
    { field: "fechacreacion", headerName: 'Fecha Creación', width: 180 },
    { field: "fechamodificacion", headerName: 'Fecha Modificación', width: 180 },
  ];

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private tareaModificarService: TareaModificarService,
    private validationService: ValidationService) {
    this.gridDataTarMod = {
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
    this.DatosTarMod = {};
    this.idTarMod = {};
    this.activationButtons();
  }

  filtrar() {
    this.verGrid = true;
    this.router.navigate([], { queryParams: {} });
    this.idTarMod = {};
    this.getTarEstado();
  }

  filtrardataCoord() {
    this.filteredCoord = this.coordFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCoord(value))
    );
  }

  filterCoord(value: string): any[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.DataCoord.filter((tipo: any) => tipo.nombre.toLowerCase().includes(filterValue));
    }
    else {
      const filterValue = parseInt(value);
      return this.DataCoord.filter((tipo: any) => tipo.id === filterValue);
    }
  }


  filtrardataProyecto() {
    this.filteredProyecto = this.proyectoFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterProyecto(value))
    );
  }

  filterProyecto(value: string): any[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.DataProyecto.filter((tipo: any) => tipo.project.toLowerCase().includes(filterValue));
    }
    else {
      const filterValue = parseInt(value);
      return this.DataProyecto.filter((tipo: any) => tipo.id === filterValue);
    }
  }

  getTarEstado() {
    this.tareaModificarService.getTarEst(this.user).subscribe({
      next: (data) => {
        data.data.forEach((element: any) => {
          element.fechacreacion = this.formatFecha(element.fechacreacion);
          element.fechamodificacion = this.formatFecha(element.fechamodificacion);
        });
        this.gridDataTarMod.api?.setColumnDefs(this.colDefs);
        this.gridDataTarMod.api?.setRowData(data.data);
        this.activationButtons();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  getTareaEstadoXid(id: number) {
    this.tareaModificarService.getTarEstXid(this.user, id).subscribe((response) => {
      if (response.data) {
        this.DatosTarMod = response.data;
        this.filterProyecto(this.DatosTarMod.codtareaestadotipo);
        this.activationButtons();
      }
      else {
        this.toastr.error('error de conexion con el servidor.')
      }
    });
  }


  getCoordinador() {
    this.validationService.getCoordinador(this.user).subscribe({
      next: (data) => {
        this.DataCoord = data.data.filter((tipo: any) => tipo.codestructuratipo === 2 && tipo.nombre.toLowerCase().startsWith('coord'));
        this.filtrardataCoord();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  onCoordinacionChange(event: any): void {
    console.log('Coordinación seleccionada:', event.value);
    this.DatosTarMod.codtareaestadotipo = event.value;
    this.getProyecto();
  }

  getProyecto() {
    this.DatosTarMod.fechainicio = this.formatFecha(this.DatosTarMod.fechainicio);
    this.DatosTarMod.fechafin = this.formatFecha(this.DatosTarMod.fechafin);
    this.tareaModificarService.getProyecto(this.user, this.DatosTarMod.codtareaestadotipo, this.DatosTarMod.fechainicio, this.DatosTarMod.fechafin,).subscribe({
      next: (data) => {
        this.DataProyecto = this.obtenerProyectosDistinct(data.data);
        this.filtrardataProyecto();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }


  onProyectoChange(event: any): void {
    console.log('Proyecto seleccionado:', event.value);
    this.DatosTarMod
    this.tareaModificarService.getTask(this.user, event.value).subscribe({
      next: (data) => {
        this.gridDataTarMod.api?.setColumnDefs(this.colDefs);
        this.gridDataTarMod.api?.setRowData(data.data);
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  save() {
    if (!this.Form?.valid) {
      this.validate = true
      this.toastr.warning('Debe diligenciar los campos remarcados en rojo');
    }
    else {
      let data: any = { ...this.DatosTarMod };
      if (this.DatosTarMod.id) {
        this.update(data);
      } else {
        this.create(data);
      }
    }
  }

  create(data: any) {
    data.estado = 'A';
    this.tareaModificarService.createTarEst(this.user, data).subscribe({
      next: (data) => {
        this.DatosTarMod = data.data;
        this.router.navigate([], { queryParams: { idTarMod: this.DatosTarMod.id } });
        this.activationButtons();
        this.toastr.success(data.mensaje);
      }, error: (error) => {
        this.toastr.error('error de conexion con el servidor.');
      }
    });
  }

  update(data: any) {
    data.fechamodificacion = typeof data.fechamodificacion === 'number' ? data.fechamodificacion : this.convertirAFecha(data.fechamodificacion);
    data.fechacreacion = typeof data.fechacreacion === 'number' ? data.fechacreacion : this.convertirAFecha(data.fechacreacion);
    this.tareaModificarService.updateTarEst(this.user, data).subscribe({
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
      this.DatosTarMod = event.data;
      this.verGrid = false;
      this.router.navigate([], { queryParams: { idTarMod: this.DatosTarMod.id } });
      this.idTarMod = this.route.snapshot.queryParams;
      this.filterCoord(this.DatosTarMod.codtareaestadotipo);
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


  obtenerProyectosDistinct(proyectos: any[]): any[] {
    return Array.from(new Set(proyectos.map((proyecto) => proyecto.codeProject))).map(
      (codeProject) => {
        return proyectos.find((proyecto) => proyecto.codeProject === codeProject);
      }
    );
  }

  formatFecha(fecharec: any) {
    if (typeof fecharec === 'number') {
      const fecha = new Date(fecharec);
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // ¡Recuerda que los meses comienzan desde 0!
      const anio = fecha.getFullYear();
      fecharec = `${dia}/${mes}/${anio}`;
    }
    else if (typeof fecharec !== 'string' && typeof fecharec !== 'number') {
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
    this.idTarMod = this.route.snapshot.queryParams;
    this.getCoordinador();
    if (this.idTarMod?.idTarMod) {
      this.getTareaEstadoXid(parseInt(this.idTarMod.idTarEst));
      this.verGrid = false;
    }
    else {
      this.getTarEstado();
    }
  }

}

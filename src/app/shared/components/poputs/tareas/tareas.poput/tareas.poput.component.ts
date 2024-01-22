import { Component, Output, OnInit, EventEmitter, ViewChild, ChangeDetectorRef} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, NgForm } from '@angular/forms';
import { ActividadesService } from '../../../../../module/actividades/service/actividades.service';
import { Observable, map, startWith} from 'rxjs';
import { ProyectoService } from '../../../../../../app/module/parametrizacion/service/proyecto.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TareaService } from '../../../../../../app/module/actividades/service/tarea.service';

@Component({
  selector: 'app-tareas.poput',
  templateUrl: './tareas.poput.component.html',
  styleUrls: ['./tareas.poput.component.css']
})
export class TareasPoputComponent  implements OnInit {
  @Output() formularioCompletado = new EventEmitter<any>();
  

  @ViewChild('form', { static: true }) Form?: NgForm;

  estadoTarea = new FormControl();
  estadoFilterCtrl = new FormControl();
  filteredEstado?: Observable<any>;
  fechaDia: any;
  campoDeshabilitado: boolean = true;
  DatosTareas: any = {
    nombre: null,
    empleado: null,
    descrip: null,
    proyecto: null,
    estado: null,
    fecha: null,
    hora: null,
    descripcionRegistro: null,
  };
  tareaObj: any;
  idTarea: any;
  validate: boolean = false;
  toolbarButton: any = {};
  user = localStorage.getItem('user');
  codempleado: any;
  idEmpleadoControl: any = 0;
  DataEstadoTarea: any= {};
  fechaCreacionEmpleadoControl: any;
  fechaModificacionEmpleadoControl: any;
  DatosEmpleadoControl: any= {};
  constructor(public activeModal: NgbActiveModal, 
    private actividadesService: ActividadesService,
    private proyectoService: ProyectoService,
    private toastr: ToastrService,
    private changeDetector: ChangeDetectorRef,
    private tareaService: TareaService,
    ) {
    
    this.toolbarButton = {
      save: () => {
        this.save();
      },
      cancel: () => {
        this.cancel();
      },
      
      editShow: false,
      saveShow: true,
      deleteShow: false,
      newShow: false,
      filterShow: false
    }
  }

   

  ngOnInit() {
    this.getTareaById(this.idTarea);
    this.filtrardataTipo();
  }

  

  filtrardataTipo() {
    this.filteredEstado = this.estadoFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterTipo(value))
    );
  }

  filterTipo(value: string): any[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.DataEstadoTarea.filter((tipo: any) => tipo.nombre.toLowerCase().includes(filterValue));
    }
    else {
      const filterValue = parseInt(value);
      return this.DataEstadoTarea.filter((tipo: any) => tipo.id === filterValue);
    }
  }

  

  save(){
    if (!this.Form?.valid) {
      this.validate = true
      this.toastr.warning('Debe diligenciar los campos remarcados en rojo');
    }else {
      let data: any = { ...this.DatosEmpleadoControl }
      data.codempleado = this.codempleado;
      data.codtarea = this.idTarea;
      data.descripcion = this.DatosTareas.descripcionRegistro;
      data.horas = this.DatosTareas.hora;
      data.fechahorainicio = this.DatosTareas.fecha;
      data.fechahorafin = this.DatosTareas.fecha;
      
      if(this.DatosTareas.hora > 9) {
        this.toastr.warning('Las horas no deben superar 9');
      }else {
        //Creacion
        if(this.idEmpleadoControl===0){
          data.id = null;
          data.fechacreacion = null;
          data.fechamodificacion = null;
          this.actividadesService.saveEmpleadoControl(data).subscribe((response) => {
            if (response.data) {
              console.log(response.data);
              this.actualizaTarea()
            } 
          });  
        }else {
          data.id = this.idEmpleadoControl;
          data.fechacreacion = new Date(this.fechaCreacionEmpleadoControl);
          data.fechamodificacion = new Date(this.fechaModificacionEmpleadoControl);
          this.actividadesService.updateEmpleadoControl(data, this.idEmpleadoControl).subscribe((response) => {
            if (response.data) {
              console.log(response.data);
              this.actualizaTarea()
            } 
          }); 
        }
      }
    }
    
  }

  cancel() {
    // Puedes emitir un evento para informar al componente principal sobre el cierre y proporcionar datos si es necesario
    this.formularioCompletado.emit({ mensaje: 'Formulario completado' });
    this.activeModal.close('cancel');
  }

  actualizaTarea(){
    this.tareaObj.codtareaestado = this.DatosTareas.estado;
    this.tareaService.updateTarea(this.tareaObj.id, this.tareaObj).subscribe((response) => {
      if (response.data) {
        console.log(response.data);
        this.activeModal.close();
      } 
    }); 
    
  }

  getTareaById(id: any){
    this.tareaService.getTareaById(id).subscribe((response) => {
      if (response.data) {
        console.log(response.data);
        this.tareaObj = response.data;
        this.DatosTareas.nombre = response.data.nombre;
        this.DatosTareas.descrip = response.data.descripcion === null ? response.data.nombre : response.data.descripcion;   
        this.DatosTareas.estado =response.data.codtareaestado;
        this.DatosTareas.fecha = this.fechaDia;
        this.filterTipo(this.DatosTareas.estado);     
        this.getProyectoName(response.data.codproyecto);
        this.getEmpleadoControlById(response.data.id);
      }
    });
  }

  

  getProyectoName(idProyecto: any){
    this.proyectoService.getProyectoXid(this.user, idProyecto).subscribe((response) => {
      if (response.data) {
        this.DatosTareas.proyecto = response.data.nombre;
      }
    });
  }

  getEmpleadoControlById(idTarea: any){
    this.actividadesService.getEmpleadoControlByIdTarea(idTarea).subscribe((response) => {
      if (response.data && response.data[0]) {
        console.log(response.data);
        this.DatosTareas.hora = response.data[0].horas;
        this.DatosTareas.descripcionRegistro = response.data[0].descripcion;
        this.idEmpleadoControl = response.data[0].id;
        this.fechaCreacionEmpleadoControl = response.data[0].fechacreacion;
        this.fechaModificacionEmpleadoControl = response.data[0].fechamodificacion;
      }
    });
  }

  

}

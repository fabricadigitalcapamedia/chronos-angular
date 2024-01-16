import { Component, Output, OnInit, EventEmitter, ViewChild} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, NgForm } from '@angular/forms';
import { ActividadesService } from '../../../../../../app/module/actividades/actividades.service';
import { Observable, map, startWith} from 'rxjs';
import { ProyectoService } from '../../../../../../app/module/parametrizacion/service/proyecto.service';

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
  idTarea: any;
  validate: boolean = false;
  toolbarButton: any = {};
  user = localStorage.getItem('user');
  DataEstadoTarea: any= {};
  
  constructor(public activeModal: NgbActiveModal, 
    private actividadesService: ActividadesService,
    private proyectoService: ProyectoService) {

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
  }

  save(){

  }

  cancel() {
    // Puedes emitir un evento para informar al componente principal sobre el cierre y proporcionar datos si es necesario
    this.formularioCompletado.emit({ mensaje: 'Formulario completado' });
    this.activeModal.close();
  }

  getTareaById(id: any){
    this.getTareasEstadoCombo();
    this.actividadesService.getTareaById(id).subscribe((response) => {
      if (response.data) {
        console.log(response.data);
        this.DatosTareas.nombre = response.data.nombre;
        this.DatosTareas.descrip = response.data.descripcion === null ? '' : response.data.descripcion;   
        this.DatosTareas.estado =response.data.codtareaestado;
        this.filterTipo(this.DatosTareas.estado);     
        this.getProyectoName(response.data.codproyecto);
      }
    });
  }

  getTareasEstadoCombo(){
    this.actividadesService.getTareasEstados().subscribe((response) => {
      if (response.data) {
        console.log(response.data);
        this.DataEstadoTarea = response.data;
        this.filtrardataTipo();
      }
    });
  }

  getProyectoName(idProyecto: any){
    this.proyectoService.getProyectoXid(this.user, idProyecto).subscribe((response) => {
      if (response.data) {
        console.log(response.data);
        this.DatosTareas.proyecto = response.data.nombre;
      }
    });
  }

  filtrardataTipo() {
    this.filteredEstado = this.estadoFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterTipo(value))
    );
  }

  filterTipo(value: string): any[] {
    if (value == "") {
      const filterValue = value.toLowerCase();
      return this.DataEstadoTarea.filter((tipo: any) => tipo.nombre.toLowerCase().includes(filterValue));
    }
    else {
      const filterValue = parseInt(value);
      return this.DataEstadoTarea.filter((tipo: any) => tipo.id === filterValue);
    }
  }

}

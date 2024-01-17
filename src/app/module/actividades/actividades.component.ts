import { ChangeDetectorRef, Component, OnInit, ViewChild, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { INITIAL_EVENTS, createEventId } from 'src/app/shared/components/calendar/event-utils';
import { ActividadesService } from './actividades.service';
import { EmpleadoService } from '../administracion/personas/empleado.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TareasPoputComponent } from '../../../app/shared/components/poputs/tareas/tareas.poput/tareas.poput.component';
//import { UtilsService } from '../../../app/shared/utils/utils.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  @ViewChild('form', { static: true }) Form?: NgForm;
  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;
  
  validate: any;
  DatosActividades: any = {
    fechainicio: null,
    fechafin: null
  };
  events: EventInput[]= [];
  //codPersona: any;
  horasMes: any;
  user = localStorage.getItem('user');
  codpersona = localStorage.getItem('codpersona');
  idEmpleado: any;

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      //right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    locale: esLocale,
    initialView: 'dayGridMonth',
    initialEvents: this.events, // alternatively, use the `events` setting to fetch from a feed
    weekends: false,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });

  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef, 
              private actividadesService: ActividadesService, 
              private empleadoService: EmpleadoService,
              private modalService: NgbModal,
              ) {
  
  }

  getActividadesFiltro(newDate: string) {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.removeAllEvents();
    const newDateObj = moment(newDate, 'DD/MM/YYYY').toDate();
    calendarApi.gotoDate(newDateObj);
    this.loadEvents();
  }

  async loadEvents(): Promise<void> {

    let fechaFin = this.DatosActividades.fechafin instanceof Date ? 
      moment(this.DatosActividades.fechafin).format('DD/MM/YYYY') : this.DatosActividades.fechafin;
    

    this.actividadesService.getActividadesFiltro(this.user, this.codpersona, 
        this.DatosActividades.fechainicio, fechaFin).subscribe((response) => {
      if (response.data) {
        response.data.forEach((item: any) =>{
          if (item.fechainiestimada!==null && item.fechafinestimada!==null) {
            if(String(item.codpersonaasignado)===this.codpersona){
              let fechaInicio: any;
              let fechaFin: any;
              if(item.fechainireal != null) {
                fechaInicio = new Date(item.fechainireal).toISOString().replace(/T.*$/, '')+'T08:00:00';
              }else {
                fechaInicio = new Date(item.fechainicio).toISOString().replace(/T.*$/, '')+'T08:00:00';
              }
              if(item.fechafin != null) {
                fechaFin = new Date(item.fechafinreal).toISOString().replace(/T.*$/, '')+'T18:00:00';
              }else {
                fechaFin = new Date(item.fechafin).toISOString().replace(/T.*$/, '')+'T18:00:00';
              }
              if (fechaInicio !== null && fechaFin !== null) {
                this.eventValidationHours(item, fechaInicio, fechaFin);
              }else{
                console.log("FechaFin null: "+ item.id)
              }
            }
          }
        });
        
      }
    });
  }

  eventValidationHours(item: any, fechaInicio: any, fechaFin: any ){
    this.actividadesService.getEmpleadoControlByIdTarea(item.id).subscribe((response) => {
      const calendarApi = this.calendarComponent.getApi();
      if (response.data && response.data[0]) {
        calendarApi.addEvent({
          id: String(item.id),
          title: item.text,
          start: fechaInicio,
          end: fechaFin,
          backgroundColor: 'blue',
          borderColor: 'blue',
          allDay: true,
        });
      }else{
        calendarApi.addEvent({
          id: String(item.id),
          title: item.text,
          start: fechaInicio,
          end: fechaFin,
          backgroundColor: 'red',
          borderColor: 'red',
          color: 'red',
          allDay: true
        });
      }
    });
    
  }

  //validacionFechas(fechaOne: any, fechaTwo): 

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    /*const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }*/
  }

  handleEventClick(clickInfo: EventClickArg) {
    const modalRef = this.modalService.open(TareasPoputComponent);
    let id = clickInfo.event.id;
    modalRef.componentInstance.idTarea = id;
    modalRef.componentInstance.codempleado = this.idEmpleado;
    modalRef.componentInstance.fechaDia = moment(clickInfo.event.start, 'DD/MM/YYYY').toDate();
    modalRef.result.then((result) => {
      this.changeDetector.detectChanges();
      window.location.reload();
      console.log('Ventana emergente cerrada con resultado:', result);
    }, (reason) => {
      
      console.log('Ventana emergente cerrada debido a:', reason);
    });
    //if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      //clickInfo.event.remove();
    //}
  }

  handleEvents(events: EventApi[]) {
    //console.log(events);
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  
    // Obtener la fecha actual del calendario
    const calendarApi = this.calendarComponent.getApi();
    const currentDate = calendarApi.getDate();  
  }

  async ngOnInit() {
    this.DatosActividades.fechainicio = moment().subtract(1, 'months').startOf('month').format('DD/MM/YYYY');
    this.DatosActividades.fechafin = moment().endOf('month').format('DD/MM/YYYY');
    this.loadEvents();
    this.cargaIdEmpleado();
    
  }

  async cargaIdEmpleado() : Promise<void>{
    this.empleadoService.getDatosEmpleadoByUsuario(this.user).subscribe((response) => {
      if (response.data) {
        this.idEmpleado = response.data.id;
        this.cargaHoras(response.data.id);
      }
    });
  }

  cargaHoras(idEmpleado: any): void{
    this.empleadoService.getHorasRegistradasEmpleado(idEmpleado).subscribe((response) => {
      if (response.data) {
        this.horasMes = response.data;
      }else {
        this.horasMes = '0';
      }
    });;
  }

}



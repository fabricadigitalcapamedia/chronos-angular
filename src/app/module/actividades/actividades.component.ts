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
    editable: true,
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
              ) {
  
  }

  getActividadesFiltro(newDate: string) {
    const calendarApi = this.calendarComponent.getApi();
    const newDateObj = moment(newDate, 'DD/MM/YYYY').toDate();
    calendarApi.gotoDate(newDateObj);
    this.loadEvents();
  }

  async loadEvents(): Promise<void> {
    console.log(this.user, ' ',  this.codpersona, ' ', this.DatosActividades.fechainicio, ' ', this.DatosActividades.fechafin)
    
    this.actividadesService.getActividadesFiltro(this.user, this.codpersona, 
        this.DatosActividades.fechainicio, 
        this.DatosActividades.fechafin).subscribe((response) => {
      if (response.data) {
        console.log(response.data);
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
              this.events.push({
                id: String(item.id),
                title: item.text,
                start: fechaInicio,
                end: fechaFin
              });
            }else{
              console.log("FechaFin null: "+ item.id)
            }
            }
          }
        })
        console.log(this.events);
        const calendarApi = this.calendarComponent.getApi();
        this.events.forEach((event: any) => {
          calendarApi.addEvent(event);
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
    const title = prompt('Please enter a new title for your event');
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
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
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
        //this.codPersona = response.data.codpersona;
        this.cargaHoras(response.data.id);
        //this.getActividadesFiltroInit();
      }
    });
  }

  cargaHoras(idEmpleado: any): void{
    //console.log(idEmpleado);
    this.empleadoService.getHorasRegistradasEmpleado(idEmpleado).subscribe((response) => {
      if (response.data) {
        this.horasMes = response.data;
      }else {
        this.horasMes = '0';
      }
    });;
  }

}



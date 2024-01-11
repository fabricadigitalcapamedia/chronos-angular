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
import { UtilsService } from '../../../app/shared/utils/utils.service';

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
    initialEvents: this.getActividadesFiltroInit(), // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
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
              private utils: UtilsService) {
  
  }

  getActividadesFiltro(newDate: string) {
    const calendarApi = this.calendarComponent.getApi();
    const newDateObj = moment(newDate, 'DD/MM/YYYY').toDate();
    calendarApi.gotoDate(newDateObj);
    console.log(this.getActividadesFiltroInit());

  }

  getActividadesFiltroInit(): EventInput[] {
    console.log(this.user, ' ',  this.codpersona, ' ', this.DatosActividades.fechainicio, ' ', this.DatosActividades.fechafin)
    let events: EventInput[]= [];
    this.actividadesService.getActividadesFiltro(this.user, this.codpersona, 
        this.DatosActividades.fechainicio, 
        this.DatosActividades.fechafin).subscribe((response) => {
      if (response.data) {
        response.data.forEach((item: any) =>{
          if (item.start_date && item.fechafinreal) {
            const fechaInicio: string = new Date(item.fechainireal).toISOString().replace(/T.*$/, '')+'T08:00:00';
            const fechaFin: string = new Date(item.fechafinreal).toISOString().replace(/T.*$/, '')+'T18:00:00';
            //const fechaFinFormat: Date = moment(fechaFin, 'YYYY-MM-dd').toDate();
            //const fechaIniFormat: Date = moment(fechaInicio, 'YYYY-MM-dd').toDate();
            //let fechaFinEstimada = this.utils.cambiarFormatoFecha(fechaFin, 'dd/MM/YYYY', 'YYYY-MM-dd') || null;
            //let fechaInicio = this.utils.cambiarFormatoFecha(fechaIni, 'dd/MM/YYYY', 'YYYY-MM-dd');
            debugger
            if (fechaFin !== null) {
              events.push({
                id: item.id,
                title: item.text,
                start: fechaInicio,
                end: fechaFin
              });
            }
          }
        })
        console.log(events);
      }
    });
    return events;
  }

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
    console.log(events);
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  
    // Obtener la fecha actual del calendario
    const calendarApi = this.calendarComponent.getApi();
    const currentDate = calendarApi.getDate();  
  }

  async ngOnInit() {
    this.DatosActividades.fechainicio = moment().subtract(1, 'months').startOf('month').format('DD/MM/YYYY');
    this.DatosActividades.fechafin = moment().endOf('month').format('DD/MM/YYYY');
    await this.cargaIdEmpleado();
    console.log(INITIAL_EVENTS);
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
        this.horasMes = response.data.id;
      }else {
        this.horasMes = '0';
      }
    });;
  }

}



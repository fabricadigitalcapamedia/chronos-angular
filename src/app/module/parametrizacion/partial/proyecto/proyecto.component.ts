import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';
import { ProyectoService } from '../../service/proyecto.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ValidationService } from '../../../../service/validation.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  @ViewChild('form', { static: true }) Form?: NgForm

  codproyectotipo = new FormControl();
  tipoFilterCtrl = new FormControl();
  filteredTipo?: Observable<any>;

  codpresupuesto = new FormControl();
  presuFilterCtrl = new FormControl();
  filteredPresu?: Observable<any>;

  gridData: GridOptions;
  column?: any[];
  rowData: any;
  jsonDinamicoRecibido?: { [key: string]: any };
  jsonDinamicoEnviado: any;
  user = localStorage.getItem('user');
  DatosProyecto: any = {};
  Datapresupuesto: any = {};
  Dataproyectipo: any = {};
  verGrid: boolean = true;
  idProyecto: any = {};
  validate: boolean = false;
  propertyValue: any = {};
  toolbarButton: any = {};

  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this), // Método para manejar el clic en el botón     
      cellRendererParams: { edit: 'Editar'},
      width: 80
    },
    { field: "codigoproyecto", headerName: 'Codigo Proyecto' },
    { field: "nombre", headerName: 'Nombre', width: 800 },
    { field: "fechainicio", headerName: 'Fecha Inicio', width: 150 },
    { field: "fechafin", headerName: 'Fecha Fin', width: 150 },
    // { field: "successful", editable: true },
    // { field: "rocket", tooltipField: 'rocket' },
  ];


  constructor(private proyectoService: ProyectoService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute,private validationService: ValidationService) {
    this.gridData = {
      context: (api: GridApi) => {
      },
      rowSelection: 'multiple'
      , pagination: false
      , singleClickEdit: false
      , enableCellTextSelection: false
      // , onSelectionChanged: (event: any) => this.onSelectionChangedCnfAPI(event)
    }

    this.toolbarButton = {
      save: () => {
        this.save();
      },
      delete: () => {
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

  filtrardataPresu() {
    this.filteredPresu = this.presuFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterPresu(value))
    );
  }


  filterPresu(value: string): any[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.Datapresupuesto.filter((presu: any) => presu.elemento_pep.toLowerCase().includes(filterValue));
    }
    else {      
      const filterValue = parseInt(value);
      return this.Datapresupuesto.filter((presu: any) => presu.id === filterValue);
    }
  }

  filtrardataTipo() {
    this.filteredTipo = this.tipoFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterTipo(value))
    );
  }

  filterTipo(value: string): any[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.Dataproyectipo.filter((tipo: any) => tipo.nombre.toLowerCase().includes(filterValue));
    }
    else {
      const filterValue = parseInt(value);
      return this.Dataproyectipo.filter((tipo: any) => tipo.id === filterValue);
    }
  }



  recibirJsonDinamico(json: { [key: string]: any }) {
    this.jsonDinamicoRecibido = json;
  }


  handleEditClick(event: any): void {
    var nuevoArray = event.eventPath[0].id;
    if (nuevoArray == 'edit') {
      this.DatosProyecto = event.data;
      this.llenarCampos();
      this.filterTipo(this.DatosProyecto.codproyectotipo);
      this.filterPresu(this.DatosProyecto.codpresupuesto);
      this.verGrid = false;
      this.router.navigate([], { queryParams: { idProyecto: this.DatosProyecto.id } });
      this.idProyecto = this.route.snapshot.queryParams;
      this.activationButtons();
    }
    else {
      this.DatosProyecto = event.data;
      console.log("Delete", this.DatosProyecto)
    }
  }

  llenarCampos() {
    this.DatosProyecto.codpresupuesto = this.DatosProyecto.codpresupuesto.id ? this.DatosProyecto.codpresupuesto.id : this.DatosProyecto.codpresupuesto;
    this.DatosProyecto.fechainicio = this.validationService.formatFecha(this.DatosProyecto.fechainicio);
    this.DatosProyecto.fechafin = this.validationService.formatFecha(this.DatosProyecto.fechafin);
  }

  getProyecto() {
    this.proyectoService.getProyecto(this.user).subscribe((response) => {
      if (response.data.length > 0) {
        response.data.forEach((element: any) => {
          element.fechainicio = this.validationService.formatFecha(element.fechainicio);
          element.fechafin = this.validationService.formatFecha(element.fechafin);
        });
        
        this.gridData.api?.setColumnDefs(this.colDefs)
        this.gridData.api?.setRowData(response.data);
        this.cargaPresupuesto();
        this.activationButtons();
      }
      else {
        this.toastr.error('error de conexion con el servidor.')
      }
    });
  }

  getProyectoXid(id: number) {
    this.cargaPresupuesto();
    this.proyectoService.getProyectoXid(this.user, id).subscribe((response) => {
      if (response.data) {
        this.DatosProyecto = response.data;
        this.llenarCampos();
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
      const presupuesto = this.Datapresupuesto.filter((item: { id: number; }) => item.id === this.DatosProyecto.codpresupuesto);
      let data: any = { ...this.DatosProyecto };
      data.codpresupuesto = presupuesto[0];
      data.fechainicio = new Date(data.fechainicio);
      data.fechafin = new Date(data.fechafin);

      if (this.DatosProyecto.id) {
        this.proyectoService.updateProyecto(this.user, data).subscribe((response) => {          
          this.toastr.success(response.mensaje);
        });

      } else {
        this.proyectoService.createProyecto(this.user, data).subscribe((response) => {
          this.DatosProyecto = response.data;
          this.router.navigate([], { queryParams: { idProyecto: this.DatosProyecto.id } });
          this.activationButtons();
          this.toastr.success(response.mensaje);
        });
      }
    }
  }

  delete() {
  }


  cargaPresupuesto() {
    this.proyectoService.getPresupuesto().subscribe((response) => {
      if (response.data.length > 0) {
        this.Datapresupuesto = response.data;
        this.filtrardataPresu();
        this.cargaProyectotipo();
      }
      else {
        this.toastr.error('error de conexion con el servidor.')
      }
    });
  }

  cargaProyectotipo() {
    this.proyectoService.getProyectoTipo().subscribe((response) => {
      if (response.data.length > 0) {
        this.Dataproyectipo = response.data;
        this.filtrardataTipo();
      }
      else {
        this.toastr.error('error de conexion con el servidor.')
      }
    });
  } 

  filtrar() {
    this.verGrid = true;
    this.router.navigate([], { queryParams: {} });
    this.idProyecto = {};
    this.getProyecto();
  }

  clear() {
    this.verGrid = false;
    this.router.navigate([], { queryParams: {} });
    this.DatosProyecto = {};
    this.cargaPresupuesto();
    this.idProyecto = {};
    this.activationButtons();
  }

  fnLoad() {
    this.idProyecto = this.route.snapshot.queryParams;
    if (this.idProyecto?.idProyecto) {
      this.getProyectoXid(parseInt(this.idProyecto.idProyecto));
      this.verGrid = false;
    }
    else {
      this.getProyecto();
    }
  }


  activationButtons() {
    if (this.verGrid) {
      this.toolbarButton.saveShow = false;
      this.toolbarButton.filterShow = false;
      this.toolbarButton.deleteShow = false;
      this.toolbarButton.newShow = true;
    } else {
      this.toolbarButton.saveShow = true;
      this.toolbarButton.filterShow = true;
     // this.DatosProyecto.id ? this.toolbarAction.deleteShow = true : this.toolbarAction.deleteShow = false;
      this.toolbarButton.newShow = true;
    }
  }
}

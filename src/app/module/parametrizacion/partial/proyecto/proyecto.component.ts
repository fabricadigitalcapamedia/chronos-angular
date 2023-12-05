import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';
import { ProyectoService } from '../../service/proyecto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  gridData: GridOptions;
  column?: any[];
  rowData: any;
  jsonDinamicoRecibido?: { [key: string]: any };
  jsonDinamicoEnviado: any;
  user = localStorage.getItem('user');

  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this), // Método para manejar el clic en el botón     
      cellRendererParams: { edit: 'Editar', delete: 'Eliminar' },
      width: 80
    },
    { field: "codigoproyecto", headerName: 'Codigo Proyecto' },
    { field: "nombre", headerName: 'Nombre', width: 1000 },
    // { field: "successful", editable: true },
    // { field: "rocket", tooltipField: 'rocket' },
  ];

  constructor(private proyectoService: ProyectoService, private toastr: ToastrService, private router: Router) {


    this.gridData = {
      context: (api: GridApi) => {
        api.setColumnDefs(this.colDefs),
          api.setRowData(this.rowData)
      },
      rowSelection: 'multiple'
      , pagination: false
      , singleClickEdit: false
      , enableCellTextSelection: false
      // , onSelectionChanged: (event: any) => this.onSelectionChangedCnfAPI(event)
    }
  }

  ngOnInit(): void {
    this.getProyecto();
  }


  recibirJsonDinamico(json: { [key: string]: any }) {
    this.jsonDinamicoRecibido = json;
  }


  handleEditClick(event: any): void {
    // Aquí puedes manejar los datos y realizar acciones específicas
    var nuevoArray = event.eventPath[0].id;
    if (nuevoArray == 'edit')
      this.jsonDinamicoRecibido = event.data;
  }

  getProyecto() {
    this.proyectoService.getProyecto(this.user).subscribe((response) => {
      if (response.data.length > 0) {
        this.gridData.api?.setRowData(response.data);
      }
      else {
        this.toastr.error('error de conexion con el servidor.')
      }
    });
  }



}

import { Component, Input, OnInit, AfterViewInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import {
  GridApi, GridOptions,
  ValueFormatterParams,
} from 'ag-grid-community';
import { Subject } from 'rxjs';
import { TemplateRenderComponent } from './template-render/template-render.component';

interface SettingsButtons extends DataTables.Settings {
  buttons?: string[];
}

@Component({
  selector: 'app-grid-chronos',
  templateUrl: './grid-chronos.component.html',
  styleUrls: ['./grid-chronos.component.css'],
})
export class GridChronosComponent implements OnInit {
  @Input() data?: any[];
  @Output() jsonDinamicoEnviado = new EventEmitter<{ [key: string]: any }>();
  @Input() gridOptions: any
  @Input() exportFileName?: string;
  @Output() gridApiInstance = new EventEmitter<any>();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtOptionsButtons: SettingsButtons = {};
  column?: any[];
  rowData?: any[];
  public gridApi: any = {};
  public showStatusBar: boolean = false;
  public searchByText!: string;
  public selectAll: boolean = false;
  _gridOptions: any;
  public style: any = {};
  rowSelect!: number;
  private localeText: any = {
    page: "Pagína",
    more: "Más",
    to: "De",
    of: "Hasta",
    next: "Siguiente",
    last: "Ultimo",
    first: "Primero",
    previous: "Anterior",
    loadingOoo: "No Hay Información Para Mostrar",
    selectAll: "Seleccionar Todo",
    searchOoo: "Buscar",
    filterOoo: "Filtro",
    applyFilter: "Aplicar Filtro",
    equals: "Igual",
    notEqual: "No Igual",
    lessThan: "Menor Que..",
    greaterThan: "Mayor Que..",
    lessThanOrEqual: "Menor o Igual",
    greaterThanOrEqual: "Mayor o Igual",
    inRange: "Entre..",
    contains: "Contiene",
    notContains: "No Contiene",
    startsWith: "Empieza En..",
    endsWith: "Termina En..",
    columns: "Columnas",
    filters: "Filtros",
    noRowsToShow: "No Hay Información Para Mostrar",
  };



  dateFormatter(params: ValueFormatterParams) {
    return new Date(params.value).toLocaleDateString('es-co', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  constructor() {


    this._gridOptions = {
      rowSelection: 'single',
      animateRows: true,
      rowData: [],
      // floatingFilter: true,
      paginationPageSize: 13,
      pagination: true,
      //  rowDeselection: true,
      enableCellTextSelection: true,
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true,
        filterParams: {
          clearButton: true
        }
      },
      localeText: this.localeText
    }

    /*   this.gridOptions1 = {
         rowSelection: 'single',
         animateRows: true,
         paginationPageSize: 13,
         pagination: true,
         columnDefs: [],
         rowData: [],  // Aquí puedes establecer tus datos
         enableCellTextSelection: true,
         defaultColDef: {
           sortable: true,
           resizable: true,
           filter: true,
           filterParams: {
             clearButton: true
           }
         },
         frameworkComponents: {
           appTemplateRender: TemplateRenderComponent,
         },
         onGridReady: this.onGridReady.bind(this),
         localeText: this.localeText
         // ... otras opciones ...
       };*/
    this.style = {
      width: '100%',
      height: '462px'
    };
  }

  /*ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
*/


  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      lengthChange: false,
      autoWidth: false,
      ordering: true,
      searching: true,
      dom: 'Bfrtip',
      orderMulti: true,
      language: {
        url: '/assets/lib/Table-Spanish.json'
      },
    };

    this.dtOptionsButtons = {
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis'],
    };


    if (this.gridOptions) {
      if (this.gridOptions.height) {
        this.style.height = this.gridOptions.height + 'px';
        delete this.gridOptions.height;
      }
      Object.keys(this.gridOptions).forEach(element => {
        this._gridOptions ? [element] : this.gridOptions[element]
      }
      );
    }


  }



  // Método que manejará el clic en el botón de edición
  handleEditClick(event: any): void {
    const action = event.data.Accion;
    debugger
    // Aquí puedes manejar los datos y realizar acciones específicas
    this.jsonDinamicoEnviado.emit(event.data);
  }

  onDeleteClick(event: any): void {
    this.jsonDinamicoEnviado.emit(event.data);
  }


  onGridReady(grid: any) {
    this.gridApi = grid.api;
    this.gridOptions.api = this.gridApi
    this.gridOptions.context(this.gridApi)
  }

  isFirstColumn(params: any) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  onBtExport() {
    var params = {
      fileName: this.exportFileName,
      columnSeparator: ","
    };
    this.gridApi.exportDataAsCsv(params);
  }


  onSelectRow() {
    let context = this;
    if (!(context.rowSelect > 0)) {
      return;
    }
    this.gridApi.forEachNode((rowNode: { rowIndex: number; setSelected: (arg0: boolean, arg1: boolean) => void; }) => {
      if (rowNode.rowIndex == context.rowSelect - 1) {
        rowNode.setSelected(true, true);
      }
    });
  }



  onSelectAll() {
    if (this._gridOptions.rowSelection === 'multiple') {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.gridApi.selectAllFiltered();
      } else {
        this.gridApi.deselectAllFiltered();
      }
    }
  }

  onShowColumns() {
    let array = this._gridOptions.columnApi?.getColumnState()
    /*array?.filter(element => {
      return element.hide == true;
    })
    array?.forEach(element => {
      this._gridOptions.columnApi?.setColumnVisible(element.colId,true)
    });*/
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LineaProductoService } from '../../service/linea-producto.service';
import { ValidationService } from '../../../../service/validation.service';

@Component({
  selector: 'app-linea-producto',
  templateUrl: './linea-producto.component.html',
  styleUrl: './linea-producto.component.css'
})
export class LineaProductoComponent implements OnInit {
  @ViewChild('form', { static: true }) Form?: NgForm;

  toolbarButton: any = {};
  gridDataLineaProducto: GridOptions;
  column?: any[];
  rowData: any;
  DatosLineaProduct: any = {};
  user = localStorage.getItem('user');
  verGrid: boolean = true;
  validate: boolean = false;
  idLineaProduct: any = {};

  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this),
      cellRendererParams: { edit: 'Editar' },
      width: 100
    },
    { field: "nombre", headerName: 'Nombre Linea Producto', width: 900 },
    { field: "fechacreacion", headerName: 'Fecha Creacion', width: 180 },
    { field: "fechamodificacion", headerName: 'Fecha Modificacion', width: 180 },
  ];
  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private validationService: ValidationService, private lineaProdcutSerice: LineaProductoService) {
    this.gridDataLineaProducto = {
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
    this.DatosLineaProduct = {};
    this.idLineaProduct = {};
    this.activationButtons();
  }

  filtrar() {
    this.verGrid = true;
    this.router.navigate([], { queryParams: {} });
    this.idLineaProduct = {};
    this.getLineaProduct();
  }
  

  getLineaProduct(){
    this.lineaProdcutSerice.getLineaProduct(this.user).subscribe({
      next: (data) => {
        data.data.forEach((element: any) => {
          element.fechacreacion = this.validationService.formatFecha(element.fechacreacion);
          element.fechamodificacion = this.validationService.formatFecha(element.fechamodificacion);
        });
        this.gridDataLineaProducto.api?.setRowData(data.data);
        this.activationButtons();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  getLineaProductXid(id: number){
    this.lineaProdcutSerice.getLineaProductXid(this.user, id).subscribe({
      next: (data) => {
        this.DatosLineaProduct = data.data;
        this.activationButtons();
      },
      error: (error) => {
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
      debugger
      let data: any = { ...this.DatosLineaProduct };
      if (this.DatosLineaProduct.id) {
        this.update(data);
      } else {  
        this.create(data);
      }
    }
  }


  create(data:any){
    this.lineaProdcutSerice.creategetLineaProduct(this.user, data).subscribe({
      next: (data) => {
        this.DatosLineaProduct = data.data;
        this.router.navigate([], { queryParams: { idLineaProduct: this.DatosLineaProduct.id } });
        this.activationButtons();
        this.toastr.success(data.mensaje);
      },
      error: (error) => {
        this.toastr.error('error al guardar intente nuevamente.');
      }
    });
  }

  update(data:any){
    data.fechamodificacion = typeof data.fechamodificacion === 'number' ? data.fechamodificacion : this.validationService.convertirAFecha(data.fechamodificacion);
    data.fechacreacion = typeof data.fechacreacion === 'number' ? data.fechacreacion : this.validationService.convertirAFecha(data.fechacreacion);
    
    this.lineaProdcutSerice.updategetLineaProduct(this.user, data).subscribe({
      next: (data) => {
        this.toastr.success(data.mensaje);
      },
      error: (error) => {
        this.toastr.error('error al actualizar intente nuevamente.')
      }
    })
  }


  handleEditClick(event: any): void {
    var nuevoArray = event.eventPath[0].id;
    if (nuevoArray == 'edit') {
      this.DatosLineaProduct = event.data;
      this.verGrid = false;
      this.router.navigate([], { queryParams: { idLineaProduct: this.DatosLineaProduct.id } });
      this.idLineaProduct = this.route.snapshot.queryParams;
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
    this.idLineaProduct = this.route.snapshot.queryParams;
    if (this.idLineaProduct?.idLineaProduct) {
      this.getLineaProductXid(parseInt(this.idLineaProduct.idLineaProduct));
      this.verGrid = false;
    }
    else {
      this.getLineaProduct();
    }
  }
}

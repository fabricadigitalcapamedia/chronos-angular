import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TemplateRenderComponent } from 'src/app/shared/components/grid-chronos/template-render/template-render.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { PerfilCostoService } from '../../service/perfil-costo.service';
import { Observable, map, startWith } from 'rxjs';
import { PerfilService } from '../../service/perfil.service';
import { PerfilTipoService } from '../../service/perfil-tipo.service';
import { PerfilNivelService } from '../../service/perfil-nivel.service';

@Component({
  selector: 'app-perfil-costo',
  templateUrl: './perfil-costo.component.html',
  styleUrl: './perfil-costo.component.css'
})
export class PerfilCostoComponent implements OnInit {

  @ViewChild('form', { static: true }) Form?: NgForm;


  //Perfil
  perfilFilterCtrl = new FormControl();
  filteredPerfil?: Observable<any>;
  Dataperfil: any = {};

  //PerfilTipo
  perfilTipoFilterCtrl = new FormControl();
  filteredPerfilTipo?: Observable<any>;
  DataperfilTipo: any = {};

  //Proveedor
  proveedorFilterCtrl = new FormControl();
  filteredProveedor?: Observable<any>;
  DataperfilPro: any = {};

  //Nivel
  nivelFilterCtrl = new FormControl();
  filteredNivel?: Observable<any>;
  DataperfilNiv: any = {};

  toolbarButton: any = {};
  gridDataPerfilCos: GridOptions;
  column?: any[];
  rowData: any;
  DatosPerfilCost: any = {};
  user = localStorage.getItem('user');
  verGrid: boolean = true;
  validate: boolean = false;
  idPerfilCost: any = {};

  colDefs: ColDef[] = [
    {
      field: "Accion", cellRenderer: TemplateRenderComponent,
      onCellClicked: this.handleEditClick.bind(this),
      cellRendererParams: { edit: 'Editar' },
      width: 100
    },
    { field: "proveedorNombre", headerName: 'Proveedor', width: 150 },
    { field: "perfilNombre", headerName: 'Perfil', width: 300 },
    { field: "perfilNivelNombre", headerName: 'Perfil Nivel', width: 180 },
    { field: "perfilTipoNombre", headerName: 'Perfil Tipo', width: 200 },
    { field: "estado", headerName: 'Estado', width: 80 },
    { field: "fechaCreacion", headerName: 'Fecha Creación', width: 150 },
    { field: "fechaModificacion", headerName: 'Fecha Modificación', width: 150 },
    { field: "valor", headerName: 'Valor', width: 150 }
  ];

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private perfilCostoService: PerfilCostoService,
    private perfilService: PerfilService, private perfilTipoService: PerfilTipoService, private perfilNivelService: PerfilNivelService) {
    this.gridDataPerfilCos = {
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
    this.DatosPerfilCost = {};
    this.idPerfilCost = {};
    this.activationButtons();
  }

  filtrar() {
    this.verGrid = true;
    this.router.navigate([], { queryParams: {} });
    this.idPerfilCost = {};
    this.activationButtons();
  }

  getPerfilCost() {
    this.perfilCostoService.getPerfilCosto(this.user).subscribe({
      next: (data) => {
        data.data.forEach((element: any) => {
          element.fechaCreacion = this.formatFecha(element.fechaCreacion);
          element.fechaModificacion = this.formatFecha(element.fechaModificacion);
        });
        this.gridDataPerfilCos.api?.setRowData(data.data);
        this.activationButtons();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  getPerfilCostXid(id: number) {
    this.perfilCostoService.getPerfilCostoXid(this.user, id).subscribe({
      next: (data) => {
        this.DatosPerfilCost = data.data;
        this.activationButtons();
        this.cargarFilters();
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
      this.getPerfilCost();
      let data: any = { ...this.DatosPerfilCost };
      if (this.DatosPerfilCost.id) {
        this.update(data);
      } else {
        this.create(data);
      }
    }
  }

  create(data: any) {
    this.perfilCostoService.createPerfilCosto(this.user, data).subscribe({
      next: (data) => {
        this.DatosPerfilCost.id = data.data.id;
        this.router.navigate([], { queryParams: { idPerfilTipo: this.DatosPerfilCost.id } });
        this.activationButtons();
        this.toastr.success(data.mensaje);
      },
      error: (error) => {
        this.toastr.error('Error al guardar.');
      }
    });
  }

  update(data: any) {
    this.perfilCostoService.updatePerfilCosto(this.user, data).subscribe({
      next: (data) => {
        this.toastr.success(data.mensaje);
      },
      error: (error) => {
        this.toastr.error('Error al modificar.')
      }
    })
  }

  handleEditClick(event: any): void {
    var nuevoArray = event.eventPath[0].id;
    if (nuevoArray == 'edit') {
      this.DatosPerfilCost = event.data;
      this.verGrid = false;
      this.router.navigate([], { queryParams: { idPerfilCost: this.DatosPerfilCost.id } });
      this.idPerfilCost = this.route.snapshot.queryParams;
      this.cargarFilters();
      this.activationButtons();
    }
  };


  filtrardataPerfil() {
    this.filteredPerfil = this.perfilFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterperfil(value))
    );
  }

  filterperfil(value: string): any[] {
    if (value == "") {
      const filterValue = value.toLowerCase();
      return this.Dataperfil.filter((perfil: any) => perfil.nombre.toLowerCase().includes(filterValue));
    }
    else {
      const filterValue = parseInt(value);
      return this.Dataperfil.filter((perfil: any) => perfil.id === filterValue);
    }
  }

  filtrardataTipo() {
    this.filteredPerfilTipo = this.perfilTipoFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterTipo(value))
    );
  }

  filterTipo(value: string): any[] {
    if (value == "") {
      const filterValue = value.toLowerCase();
      return this.DataperfilTipo.filter((tipo: any) => tipo.nombre.toLowerCase().includes(filterValue));
    }
    else {
      const filterValue = parseInt(value);
      return this.DataperfilTipo.filter((tipo: any) => tipo.id === filterValue);
    }
  }


  filtrardataNivel() {
    this.filteredNivel = this.nivelFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterNivel(value))
    );
  }

  filterNivel(value: string): any[] {
    if (value == "") {
      const filterValue = value.toLowerCase();
      return this.DataperfilNiv.filter((tipo: any) => tipo.nombre.toLowerCase().includes(filterValue));
    }
    else {
      const filterValue = parseInt(value);
      return this.DataperfilNiv.filter((tipo: any) => tipo.id === filterValue);
    }
  }

  getPerfil() {
    this.perfilService.getPerfil(this.user).subscribe({
      next: (data) => {
        this.Dataperfil = data.data;
        this.filtrardataPerfil();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }


  getPerfilTpo() {
    this.perfilTipoService.getPerfilTipo(this.user).subscribe({
      next: (data) => {
        this.DataperfilTipo = data.data;
        this.filtrardataTipo();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  getPerfilNivel() {
    this.perfilNivelService.getPerfilNivel(this.user).subscribe({
      next: (data) => {
        this.DataperfilNiv = data.data;
        this.filtrardataNivel();
      },
      error: (error) => {
        this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  cargarFilters() {
    this.filterperfil(this.DatosPerfilCost.perfilId);
    this.filterTipo(this.DatosPerfilCost.perfilTipoId);
    this.filterNivel(this.DatosPerfilCost.perfilNivelId);
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
      this.toolbarButton.newShow = true;
    }
  }

  formatFecha(fecharec: any) {
    if (typeof fecharec === 'number') {
      const fecha = new Date(fecharec);
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // ¡Recuerda que los meses comienzan desde 0!
      const anio = fecha.getFullYear();
      fecharec = `${dia}/${mes}/${anio}`;
    }
    return fecharec;
  }


  fnLoad() {
    this.idPerfilCost = this.route.snapshot.queryParams;
    this.getPerfil();
    this.getPerfilTpo();
    this.getPerfilNivel();
    if (this.idPerfilCost?.idPerfilCost) {
      this.getPerfilCostXid(parseInt(this.idPerfilCost.idPerfilCost));
      this.verGrid = false;
    }
    else {
      this.getPerfilCost();
    }
  }

}

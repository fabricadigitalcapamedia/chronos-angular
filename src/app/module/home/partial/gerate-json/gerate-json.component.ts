import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { ModalJsonComponent } from '../modal-json/modal-json.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { GenerateJsonService } from '../../../home/service/generate-json.service';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-gerate-json',
  templateUrl: './gerate-json.component.html',
  styleUrls: ['./gerate-json.component.css']
})
export class GerateJsonComponent implements OnInit {
  data: any[] = [];
  filtroNombre: string = '';
  elementosFiltrados: any[] = []; 
  opciones: string[] = [];


  constructor(private modalService: NgbModal, private generateJsonService: GenerateJsonService) {
  }

  ngOnInit() {
    Aos.init();
    this.generateJsonService.getJson().subscribe((data) => {
      this.data = data.data;
      this.opciones = this.data.map((item: { nameService: any; }) => item.nameService);;
    });
  }

  public metododata = {
    id: 0,
    nameservice: '',
    namespace: '',
    infraestructura: '',
    path: '',
    metodo: [
      {
        namemetodo: 'Nuevo metodo',
        peticion: 'Get',
        urlmetodo: '',
        urlcompleta: '',
        request: [{
          nameparam: '',
          tipo: '',
          descripparam: '',
        }],
        response: [
          {
            namerespon: '',
            tiporespon: '',
            descrirespon: '',
            ejemploreson: '',
          }],
      }
    ]
  };


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200), // Espera 200ms después de cada pulsación de tecla
      distinctUntilChanged(), // Evita búsquedas repetidas
      switchMap(term =>
        // Simula una búsqueda en el arreglo de opciones
        of(this.opciones.filter(option => option.toLowerCase().includes(term.toLowerCase())))
      )
    );


  seleccionarElemento(value: string) {
    this.filtroNombre = value;
    this.elementosFiltrados = this.data.filter((elemento) => {
      return elemento.nameService.toLowerCase().includes(this.filtroNombre.toLowerCase());
    });
    let resultdata = JSON.parse(this.elementosFiltrados[0].json);

    this.metododata.id = this.elementosFiltrados[0].id;
    this.metododata.nameservice = resultdata.nameservice;
    this.metododata.namespace = resultdata.namespace;
    this.metododata.infraestructura = resultdata.infraestructura;
    this.metododata.path = resultdata.path;

    this.metododata.metodo = resultdata.metodo.map((metodo: { namemetodo: any; peticion: any; urlmetodo: any; urlcompleta: any; request: any[]; response: any[]; }) => ({
      namemetodo: metodo.namemetodo,
      peticion: metodo.peticion,
      urlmetodo: metodo.urlmetodo,
      urlcompleta: metodo.urlcompleta,
      request: metodo.request.map((request: { nameparam: any; tipo: any; descripparam: any; }) => ({
        nameparam: request.nameparam,
        tipo: request.tipo,
        descripparam: request.descripparam,
      })),
      response: metodo.response.map((response: { namerespon: any; tiporespon: any; descrirespon: any; ejemploreson: any; }) => ({
        namerespon: response.namerespon,
        tiporespon: response.tiporespon,
        descrirespon: response.descrirespon,
        ejemploreson: response.ejemploreson,
      })),
    }));

    this.elementosFiltrados = [];
  }


  openModal() {
    const modalRef = this.modalService.open(ModalJsonComponent);
    modalRef.componentInstance.data = this.metododata;
  }

  deleteRequestParam(dato: any, index: number) {
    if (dato.request && dato.request.length > index) {
      dato.request.splice(index, 1); // Elimina el parámetro de Request en el objeto dato
    }
  }

  deleteResponseParam(dato: any, index: number) {
    if (dato.response && dato.response.length > index) {
      dato.response.splice(index, 1); // Elimina el parámetro de Response en el objeto dato
    }
  }

  agregarMetodo() {
    const nuevoMetodo = {
      namemetodo: 'Nuevo metodo',
      peticion: 'Get',
      urlmetodo: '',
      urlcompleta: '',
      request: [],
      response: []
    };
    this.metododata.metodo.push(nuevoMetodo);
  }

  agregarParametroEntrada(metodo: any) {
    metodo.request.push({
      nameparam: '',
      tipo: '',
      descripparam: '',
    });
  }

  agregarResponse(metodo: any) {
    metodo.response.push({
      namerespon: '',
      tiporespon: '',
      descrirespon: '',
      ejemploreson: '',
    });
  }

  eliminarMetodo(index: number): void {
    if (index >= 0 && index < this.metododata.metodo.length) {
      this.metododata.metodo.splice(index, 1); // Elimina el elemento en el índice especificado
    }
  }

  actualizarUrlCompleta(metodo: any, valor: any) {
    metodo.metodo[valor].urlcompleta = `${metodo.nameservice}${metodo.namespace}${metodo.infraestructura}${metodo.path}${metodo.metodo[valor].urlmetodo}`;
  }


  savemetodo() {
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    console.log('data:', this.metododata);
  }

}

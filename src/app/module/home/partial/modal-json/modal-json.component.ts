import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Clipboard } from '@angular/cdk/clipboard';
import { GenerateJsonService } from '../../../home/service/generate-json.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-modal-json',
  templateUrl: './modal-json.component.html',
  styleUrls: ['./modal-json.component.css']
})
export class ModalJsonComponent {
  @Input() data: any; // Declaración de la propiedad de entrada data
  constructor(private toastr: ToastrService,public activeModal: NgbActiveModal, private clipboard: Clipboard, private generateService: GenerateJsonService) { }
  mensaje: any = 'Copiar';

  copyToClipboard() {
    const jsonDataAsString = JSON.stringify(this.data, null, 2);
    this.clipboard.copy(jsonDataAsString);
    this.mensaje = 'Copiado';
  }

  exportarAJSON() {
    // Convierte el objeto a una cadena JSON
    const datosJSON = JSON.stringify(this.data, null, 2);
    const blob = new Blob([datosJSON], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.data.nameservice + '.json';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    this.save();
  }

  save() {

    let obj = {
      "nameService": this.data.nameservice,
      "json": JSON.stringify(this.data, null, 2),
      "fechaCreacion": new Date().toISOString().slice(0, 19),
      "fechaModificacion": new Date().toISOString().slice(0, 19)
    }
    if (this.data.id === 0) {
      this.generateService.createItem(obj).subscribe((response) => {
        this.toastr.success(response.mensaje)
      });
    }
    else{
      this.generateService.updateItem(this.data.id,obj).subscribe((response) => {        
        this.toastr.success(response.mensaje)
      });
    }
  }
}


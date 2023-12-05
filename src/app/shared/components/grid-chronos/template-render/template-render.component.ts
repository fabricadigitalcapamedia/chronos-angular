import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


interface ButtonConfig {
  name:string;
  iconClass: string;
  title: string;
}

@Component({
  selector: 'app-template-render',
  template: `
  <div style="display: flex; gap: 10px;">
  <div *ngFor="let button of buttons">
    <i  class="{{ button.iconClass }}" title="{{ button.title }}" [id]="button.name"></i>
</div>
</div>

`
})
export class TemplateRenderComponent implements ICellRendererAngularComp {
  private params: any;
  public buttons: ButtonConfig[] = [];
  @Output() editClick: EventEmitter<any> = new EventEmitter();

  agInit(params: any): void {
    this.params = params;
    this.buttons = this.getButtons();
  }

  getTitle(): string {
    // Lógica para determinar el título en función de algún estado o condición
    return this.params.editTitle; // o this.params.assignTitle, según corresponda
  }
  // Método llamado cuando se hace clic en el botón
  onButtonClick(button: ButtonConfig): void {
    // Puedes realizar acciones específicas aquí, por ejemplo, abrir un formulario de edición
    console.log(`Clic en el botón "${button.title}". Fila:`, this.params.node.data);
  }

  private getButtons(): ButtonConfig[] {
    const buttons: ButtonConfig[] = [];
    if (this.params.colDef.cellRendererParams.edit) {
      buttons.push({ name:'edit',iconClass: 'fa fa-edit', title: 'Editar' });
    } if (this.params.colDef.cellRendererParams.delete) {
      buttons.push({ name:'delete', iconClass: 'fa fa-trash', title: 'Eliminar' });
    }
    return buttons;
  }

  // Obligatorio: Retorna el contenido del componente
  refresh(params: any): boolean {
    return true;
  }

}

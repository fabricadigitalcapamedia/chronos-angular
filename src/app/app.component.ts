import { Component } from '@angular/core';
import { AutenticationService } from './autentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
  <router-outlet></router-outlet> <!-- Componentes de la aplicación se cargarán aquí -->
`
})
export class AppComponent {

  constructor(private autenticationService: AutenticationService) {
    // Inicializa el servicio de inactividad en el constructor del AppComponent
    this.autenticationService.initActivityListeners(); // Llama al método que configura los oyentes
  }
}

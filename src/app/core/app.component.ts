import { Component } from '@angular/core';
import { AutenticationService } from '../autentication.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
  <router-outlet></router-outlet> <!-- Componentes de la aplicación se cargarán aquí -->
`
})
export class AppComponent {

  constructor(private autenticationService: AutenticationService, private logger: NGXLogger) {
    // Inicializa el servicio de inactividad en el constructor del AppComponent
    this.autenticationService.initActivityListeners(); // Llama al método que configura los oyentes
  }

  logSomething() {
    this.logger.debug('This is a debug message');
    this.logger.info('This is an info message');
    this.logger.warn('This is a warning message');
    this.logger.error('This is an error message');
  }
}

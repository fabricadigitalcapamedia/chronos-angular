import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  private isAuthenticated = false;
  private timeout: any;
  constructor(private router: Router) { }

  canActivate() {
    const valorGuardado = localStorage.getItem('login');
    this.isAuthenticated = valorGuardado === 'true';
    if (this.isAuthenticated) { return this.isAuthenticated; }
    else { return this.router.createUrlTree(['/login']); }
  }

  canActivateLogin() {
    const valorGuardado = localStorage.getItem('login');
    this.isAuthenticated = valorGuardado === 'true';
    if (this.isAuthenticated) {
      this.router.navigate(['/home']);
      return true;
    }
    else { return true;}
  }

  logout(): void {
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

  resetTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.logout();
    }, 360000); // 1 minutos en milisegundos
  }

  initActivityListeners() {
    // Escucha eventos de actividad, como clics del mouse y pulsaciones de teclas, para reiniciar el temporizador.
    window.addEventListener('mousemove', this.resetTimer.bind(this));
    window.addEventListener('keydown', this.resetTimer.bind(this));
  }
}

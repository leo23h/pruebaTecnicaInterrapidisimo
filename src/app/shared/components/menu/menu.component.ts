import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private  router = inject(Router);

  cerrarSesion() {
    // Aquí puedes agregar la lógica para cerrar sesión
    console.log('Sesión cerrada');
    this.navigateTo('auth');
  }

  navigateTo (urlToNavigate: string, id?: number) {
    this.router.navigateByUrl(`${urlToNavigate}`);
  }
}

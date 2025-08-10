import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from '../../models/estudiante.interface';
import { SignInService } from '../../../core/services/signin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
 
  private  router = inject(Router);
  private signedInService = inject(SignInService);
  estudianteInfo: Estudiante = {} as Estudiante;
  private subscription: Subscription | undefined;

  ngOnInit(): void {
    this.cargarInformacionEstudiante();
  }
  cargarInformacionEstudiante() {
    setTimeout(() => {
      this.estudianteInfo = JSON.parse(
        sessionStorage.getItem('estudiante') || '{}'
      );
    }, 500);
  }


  cerrarSesion() {
    // Aquí puedes agregar la lógica para cerrar sesión
    console.log('Sesión cerrada');
    sessionStorage.clear();
    this.navigateTo('auth');
  }

  navigateTo (urlToNavigate: string, id?: number) {
    this.router.navigateByUrl(`${urlToNavigate}`);
  }
}

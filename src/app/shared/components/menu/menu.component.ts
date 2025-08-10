import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from '../../models/estudiante.interface';
import { SignInService } from '../../../core/services/signin.service';

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

  ngOnInit(): void {
    this.estudianteInfo = JSON.parse(sessionStorage.getItem('estudiante') || '{}');
    this.obtenerInformacionEstudiante();
  }


  obtenerInformacionEstudiante() {
    this.signedInService.getInformacionEstudiante().subscribe((response)=> {
       this.estudianteInfo = response;
       console.log("informacion estudiante en dashboard", this.estudianteInfo);
     })
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

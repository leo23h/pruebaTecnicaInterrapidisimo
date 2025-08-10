import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable,} from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Estudiante } from '../../shared/models/estudiante.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EstudianteService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  

  getEstudiantes(): Estudiante[] {
    // return this.http.get<any[]>('http://localhost:3000/estudiantes').pipe(
    //   catchError(this.handleError)
    // );
    let resp = [
        { id: 1, nombre: 'Leonardo', apellido: 'Herrera', email: 'leonardo@univerdidad.com', telefono: '1234567890', materias: [
          { id: 9, nombre: 'Ingenieria de software I', codigo: 'ING101', creditos: 3 },
          { id: 6, nombre: 'Estructura de Datos', codigo: 'EST001', creditos: 3 },
          { id: 3, nombre: 'Algoritmos I', codigo: 'ALG101', creditos: 3 }
          ]
        },
        { id: 2, nombre: 'Joseph', apellido: 'Ariza', email: 'Joseph@univerdidad.com', telefono: '987456321', materias: [
          { id: 6, nombre: 'Estructura de Datos', codigo: 'EST001', creditos: 3 },
          { id: 7, nombre: 'Base de Datos', codigo: 'BASED001', creditos: 3 },
          { id: 10, nombre: 'Automatización', codigo: 'AUT101', creditos: 3 }]
        },
        
    ];

    return resp;
  }

  obtenerEstudiantes() {
    const url = `${this.baseUrl}${environment.prefijos.estudiante}/GetAllEstudiantes`;
    return this.http.get<Estudiante>(`${url}`);
  }

  obtenerEstudiantePorUsuario(idUsuario: number) {
    const url = `${this.baseUrl}${environment.prefijos.estudiante}/GetEstudianteByUsuario`;
    return this.http.get<Estudiante>(`${url}/${idUsuario}`);
  }
 

}

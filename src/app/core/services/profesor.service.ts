import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable,} from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Profesor } from '../../shared/models/profesor.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class profesorService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
   

  getProfesores(): Profesor[] {
    // return this.http.get<any[]>('http://localhost:3000/estudiantes').pipe(
    //   catchError(this.handleError)
    // );
    let resp =[
        { id: 1, nombre: 'Darwin', apellido: 'Mercado', email: 'profesor1@univerdidad.com', telefono: '1234567890', materias: [
          { id: 9, nombre: 'Ingenieria de software I', codigo: 'ING101', creditos: 3 },
          { id: 10, nombre: 'Automatización', codigo: 'AUT101', creditos: 3 }]
        },
        { id: 1, nombre: 'Paola', apellido: 'Ariza', email: 'profesor2@univerdidad.com', telefono: '987456321', materias: [
          { id: 6, nombre: 'Estructura de Datos', codigo: 'EST001', creditos: 3 },
          { id: 7, nombre: 'Base de Datos', codigo: 'BASED001', creditos: 3 }]
        },
        { id: 1, nombre: 'Alexis', apellido: 'De la Hoz', email: 'profesor3@univerdidad.com', telefono: '9632587441', materias: [
          { id: 3, nombre: 'Algoritmos I', codigo: 'QUI101', creditos: 3 },
          { id: 4, nombre: 'Programación I', codigo: 'PROG01', creditos: 3 }]
        },
        { id: 1, nombre: 'Jorge', apellido: 'Piñeres', email: 'profesor4@univerdidad.com', telefono: '456789123', materias: [
          { id: 9, nombre: 'Ingenieria de software I', codigo: 'ING101', creditos: 3 },
          { id: 10, nombre: 'Ingenieria de software 2', codigo: 'AUT101', creditos: 3 }]
        },
        { id: 1, nombre: 'Roberto', apellido: 'Morales', email: 'profesor5@univerdidad.com', telefono: '123789456', materias: [
          { id: 1, nombre: 'Matemáticas Discretas', codigo: 'MAT101', creditos: 3 },
        { id: 2, nombre: 'Física Mecánica', codigo: 'FIS101', creditos: 3 }]
        },
      ];

    return resp;
  }

  obtenerProfesores() {
    const url = `${this.baseUrl}${environment.prefijos.profesor}/GetAllProfesores`;
    return this.http.get<Profesor[]>(`${url}`);
  }
 

}

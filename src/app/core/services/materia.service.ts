import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable,} from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Materia, MateriaRequest } from '../../shared/models/materia.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MateriaService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getMaterias(): Materia[] {
    // return this.http.get<any[]>('http://localhost:3000/estudiantes').pipe(
    //   catchError(this.handleError)
    // );
    let resp = [
        { id: 1, nombre: 'Matemáticas Discretas', codigo: 'MAT101', creditos: 3 },
        { id: 2, nombre: 'Física Mecánica', codigo: 'FIS101', creditos: 3 },
        { id: 3, nombre: 'Algoritmos I', codigo: 'QUI101', creditos: 3 },
        { id: 4, nombre: 'Programación I', codigo: 'PROG01', creditos: 3 },
        { id: 5, nombre: 'Algoritmos I', codigo: 'ALG001', creditos: 3 },
        { id: 6, nombre: 'Estructura de Datos', codigo: 'EST001', creditos: 3 },
        { id: 7, nombre: 'Base de Datos', codigo: 'BASED001', creditos: 3 },
        { id: 8, nombre: 'Teoria de Automatas', codigo: 'TEA001', creditos: 3 },
        { id: 9, nombre: 'Ingenieria de software I', codigo: 'ING101', creditos: 3 },
        { id: 10, nombre: 'Automatización', codigo: 'AUT101', creditos: 3 },
        { id: 10, nombre: 'Automatización2', codigo: 'AUT101', creditos: 3 },
        { id: 10, nombre: 'Automatización3', codigo: 'AUT101', creditos: 3 }
      ];

    return resp;
  }

  obtenerTodasMaterias() {
    const url = `${this.baseUrl}${environment.prefijos.materia}/GetAllMaterias`;
    return this.http.get<Materia[]>(url)
  }

  matricularMateriasPorEstudiante(data: MateriaRequest) {
    const url = `${this.baseUrl}${environment.prefijos.materia}/MatricularMateriasPorEstudiante`;
    return this.http.post<any>(url, data)
  }

  eliminarMateriasPorEstudiante(data: MateriaRequest) {
    const url = `${this.baseUrl}${environment.prefijos.materia}/EliminarMateriasPorEstudiante`;
    return this.http.post<any>(url, data);
  }

  obtenerMateriasPorEstudiante(idEstudiante: number) {
    const url = `${this.baseUrl}${environment.prefijos.materia}/GetMateriaPorIdEstudiante`;
    return this.http.get<any>(`${url}/${idEstudiante}` );
  }

 

}

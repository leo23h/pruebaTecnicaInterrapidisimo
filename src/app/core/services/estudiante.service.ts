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
  

  obtenerEstudiantes() {
    const url = `${this.baseUrl}${environment.prefijos.estudiante}/GetAllEstudiantes`;
    return this.http.get<Estudiante[]>(`${url}`);
  }

  obtenerEstudiantePorUsuario(idUsuario: number) {
    const url = `${this.baseUrl}${environment.prefijos.estudiante}/GetEstudianteByUsuario`;
    return this.http.get<Estudiante>(`${url}/${idUsuario}`);
  }
 

}

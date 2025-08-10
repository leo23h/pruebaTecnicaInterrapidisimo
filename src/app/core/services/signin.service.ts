import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable,} from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Profesor } from '../../shared/models/profesor.interface';
import { environment } from '../../../environments/environment';
import { UsuarioRequest } from '../../shared/models/usuario.interface';
import { Estudiante } from '../../shared/models/estudiante.interface';

@Injectable({
  providedIn: 'root'
})

export class SignInService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  private informacionEstudiante = new Subject<Estudiante>();

  captureInformacionEstudiante(estudiante: Estudiante) {
    this.informacionEstudiante.next(estudiante);
  }

  getInformacionEstudiante(): Observable<any> {
    return this.informacionEstudiante.asObservable();
  }

  iniciarSesion(usuario: string) {
    const url = `${this.baseUrl}${environment.prefijos.usuario}/GetusuarioByEmail`;
    return this.http.post<any>(url, {"email": usuario})
  }

  registrarUsuario(data: UsuarioRequest) {
    const url = `${this.baseUrl}${environment.prefijos.usuario}/RegistrarUsuario`;
    return this.http.post<Profesor>(url, data);
  }
   

 
 

}

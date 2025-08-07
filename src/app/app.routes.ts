import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MateriaComponent } from './materia/materia.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudianteDetalleComponent } from './estudiante-detalle/estudiante-detalle.component';
import { ProfesorComponent } from './profesor/profesor.component';

export const routes: Routes = [
  { path: 'auth', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'subject', component: MateriaComponent },
  { path: 'teachers', component: ProfesorComponent },
  {
    path: 'student',
    component: EstudianteComponent,
    children: [
      { path: 'student-detail/:id', component: EstudianteDetalleComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

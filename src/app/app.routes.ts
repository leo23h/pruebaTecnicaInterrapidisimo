import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MateriaComponent } from './materia/materia.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudianteDetalleComponent } from './estudiante-detalle/estudiante-detalle.component';

export const routes: Routes = [
  { path: 'auth', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'subject', component: MateriaComponent },
  {
    path: 'student',
    component: EstudianteComponent,
    children: [
      { path: 'student-detail/:id', component: EstudianteDetalleComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

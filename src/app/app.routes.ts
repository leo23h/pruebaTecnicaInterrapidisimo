import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MateriaComponent } from './materia/materia.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudianteDetalleComponent } from './estudiante-detalle/estudiante-detalle.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'auth', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'materia', component: MateriaComponent },
  { path: 'profesor', component: ProfesorComponent },
  { path: 'estudiante',component: EstudianteComponent},
  { path: '**', component: NotfoundComponent } // Redirige a SignInComponent para cualquier ruta no definida,
];

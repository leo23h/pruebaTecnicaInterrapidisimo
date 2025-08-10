import { Routes } from '@angular/router';
import { SignInComponent } from './features/sign-in/sign-in.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MateriaComponent } from './features/materia/materia.component';
import { EstudianteComponent } from './features/estudiante/estudiante.component';
import { ProfesorComponent } from './features/profesor/profesor.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'auth', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'materia', component: MateriaComponent },
  { path: 'profesor', component: ProfesorComponent },
  { path: 'estudiante',component: EstudianteComponent},
  { path: '**', component: NotfoundComponent } // Redirige a SignInComponent para cualquier ruta no definida,
];

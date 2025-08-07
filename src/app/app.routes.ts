import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'auth', component: SignInComponent },
  { path: '**', redirectTo: '' },
];

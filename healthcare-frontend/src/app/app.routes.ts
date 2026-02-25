import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'patients',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/patients/patient-list/patient-list.component')
      .then(m => m.PatientListComponent)
  }
];

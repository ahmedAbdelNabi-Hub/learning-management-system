import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './layout/auth-layout/auth.routes';
import { INSTRUCTOR_ROUTES } from './layout/instructor-layout/instructor.routes';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./layout/auth-layout/auth-layout').then(m => m.AuthLayout),
        children: AUTH_ROUTES
    },
      {
        path: 'dashboard/instructor', loadComponent: () => import('./layout/instructor-layout/instructor-layout').then(m => m.InstructorLayout),
        children: INSTRUCTOR_ROUTES
    },
];


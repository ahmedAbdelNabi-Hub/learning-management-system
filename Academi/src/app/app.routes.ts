import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './layout/auth-layout/auth.routes';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./layout/auth-layout/auth-layout').then(m => m.AuthLayout),
        children: AUTH_ROUTES
    },
];


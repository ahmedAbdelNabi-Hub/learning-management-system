import { Routes } from "@angular/router";

export const AUTH_ROUTES: Routes = [
    { path: 'login', loadComponent: () => import('../../features/auth/login/login').then(m => m.Login) },
    { path: 'register', loadComponent: () => import('../../features/auth/register/register').then(m => m.RegistrationStepsComponent) },

    { path: 'create-account', loadComponent: () => import('../../features/auth/type-account/type-account').then(m => m.TypeAccount) },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];


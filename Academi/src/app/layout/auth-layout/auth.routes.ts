import { Routes } from "@angular/router";

export const AUTH_ROUTES: Routes = [
    { path: 'login', loadComponent: () => import('../../features/auth/login/login').then(m => m.Login) },
    { path: 'register', loadComponent: () => import('../../features/auth/register/register').then(m => m.RegistrationStepsComponent) },
    { path: 'confirm-email', loadComponent: () => import('../../features/auth/confirm-email/confirm-email').then(m => m.ConfirmEmail) },

    { path: 'create-account', loadComponent: () => import('../../features/auth/account-type/account-type').then(m => m.AccountType) },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];


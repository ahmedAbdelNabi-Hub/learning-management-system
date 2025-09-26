import { Routes } from "@angular/router";

export const AUTH_ROUTES: Routes = [
    { path: 'login', loadComponent: () => import('../../features/auth/pages/login/login').then(m => m.Login) },
    { path: 'register', loadComponent: () => import('../../features/auth/pages/register/register').then(m => m.RegistrationStepsComponent) },
    { path: 'confirm-email', loadComponent: () => import('../../features/auth/pages/confirm-email/confirm-email').then(m => m.ConfirmEmail) },
    {
        path: 'confirm-email',
        loadComponent: () => import('../../features/auth/pages/confirm-email/confirm-email').
            then(m => m.ConfirmEmail)
    },
    {
        path: 'change-password',
        loadComponent: () => import('../../features/auth/pages/change-password/change-password').
            then(m => m.ChangePassword), pathMatch: "full"

    },
    {
        path: 'forget-password',
        loadComponent: () => import('../../features/auth/pages/forget-password/forget-password').
            then(m => m.ForgetPassword),
        pathMatch: "full"
    },

    { path: 'create-account', loadComponent: () => import('../../features/auth/pages/account-type/account-type').then(m => m.AccountType) },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];


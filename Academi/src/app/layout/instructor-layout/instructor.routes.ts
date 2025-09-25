import { Routes } from "@angular/router";

export const INSTRUCTOR_ROUTES: Routes = [
    { path: 'dashboard', loadComponent: () => import('../../features/instructor/pages/dashboard/dashboard').then(m => m.Dashboard) },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];


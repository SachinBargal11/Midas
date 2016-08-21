import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../components/pages/login';
import {SignupComponent} from '../components/pages/signup';
import {DashboardComponent} from '../components/pages/dashboard';
import {PatientsShellRoutes} from './patient-routes';
import {UsersRoutes} from './user-routes';
import {ProvidersRoutes} from './provider-routes';
import {MedicalFacilitiesRoutes} from './medical-facility-routes';
import {ValidateActiveSession} from './guards/validate-active-session';
import {ValidateInActiveSession} from './guards/validate-inactive-session';
import {ChangePasswordComponent} from '../components/pages/change-password';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [ValidateInActiveSession]
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [ValidateInActiveSession]
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ValidateActiveSession]
    },
    ...MedicalFacilitiesRoutes,
    ...ProvidersRoutes,
    ...UsersRoutes,
    ...PatientsShellRoutes
];
export const APP_ROUTER_PROVIDER = RouterModule.forRoot(appRoutes);
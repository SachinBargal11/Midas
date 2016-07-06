import { provideRouter, RouterConfig } from '@angular/router';
import {LoginComponent} from '../components/pages/login';
import {SignupComponent} from '../components/pages/signup';
import {DashboardComponent} from '../components/pages/dashboard';
import {PatientsShellRoutes} from './patient-routes';
import {ValidateActiveSession} from './guards/validate-active-session';
import {ValidateInActiveSession} from './guards/validate-inactive-session';

export const appRoutes: RouterConfig = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'login', component: LoginComponent, canActivate: [ValidateInActiveSession] },
    { path: 'signup', component: SignupComponent, canActivate: [ValidateInActiveSession] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [ValidateActiveSession] },
    ...PatientsShellRoutes
];
export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);
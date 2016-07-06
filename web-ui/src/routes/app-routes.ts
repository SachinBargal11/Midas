import { provideRouter, RouterConfig } from '@angular/router';
import {LoginComponent} from '../components/pages/login';
import {SignupComponent} from '../components/pages/signup';
import {DashboardComponent} from '../components/pages/dashboard';
import {PatientsShellRoutes} from './patient-routes';

export const appRoutes: RouterConfig = [
    // { path: '', redirectTo: '/dashboard' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent },
    ...PatientsShellRoutes
];
export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);
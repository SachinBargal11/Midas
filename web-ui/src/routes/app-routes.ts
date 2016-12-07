import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/pages/login';
// import {SignupComponent} from '../components/pages/signup';
import { DashboardComponent } from '../components/pages/dashboard';
import { PatientManagerRoutes } from './patient-manager-routes';
import { PatientsShellRoutes } from './patient-routes';
import { UsersRoutes } from './user-routes';
import { ProvidersRoutes } from './provider-routes';
import { MedicalFacilitiesRoutes } from './medical-facility-routes';
import { DoctorsRoutes } from './doctors-routes';
import { SpecialityRoutes } from './speciality-routes';
import { MedicalProviderRoutes } from './medical-provider';
import { ValidateActiveSession } from './guards/validate-active-session';
import { ValidateInActiveSession } from './guards/validate-inactive-session';
import { ChangePasswordComponent } from '../components/pages/change-password';
import { ForgotPasswordComponent } from '../components/pages/forgot-password';
import { ResetPasswordComponent } from '../components/pages/reset-password';
import { RegisterCompanyComponent } from '../components/pages/register-company';
import { AccountActivationComponent } from '../components/pages/account-activation';
import { SecurityCheckComponent } from '../components/pages/security-check';
import { SpecialityDetailsRoutes } from './speciality-details-routes';

export const appRoutes: Routes = [
    {
        path: 'activation/:token',
        component: AccountActivationComponent,
        canActivate: [ValidateInActiveSession]
    },
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
        path: 'login/security-check',
        component: SecurityCheckComponent,
        canActivate: [ValidateInActiveSession]
    },
    // {
    //     path: 'signup',
    //     component: SignupComponent,
    //     canActivate: [ValidateInActiveSession]
    // },
    {
        path: 'register-company',
        component: RegisterCompanyComponent,
        canActivate: [ValidateInActiveSession]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [ValidateInActiveSession]
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
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
    ...PatientManagerRoutes,
    ...DoctorsRoutes,
    ...MedicalProviderRoutes,
    ...MedicalFacilitiesRoutes,
    ...ProvidersRoutes,
    ...UsersRoutes,
    ...PatientsShellRoutes,
    ...SpecialityRoutes,
    ...SpecialityDetailsRoutes
];
export const APP_ROUTER_PROVIDER = RouterModule.forRoot(appRoutes);
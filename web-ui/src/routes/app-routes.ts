import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/pages/login';
import { DashboardComponent } from '../components/pages/dashboard';
import { PatientManagerRoutes } from './patient-manager-routes';
import { PatientsShellRoutes } from './patient-routes';
import { DoctorsRoutes } from './doctors-routes';
import { MedicalProviderRoutes } from './medical-provider-routes';
import { AccountSetupRoutes } from './account-setup-routes';
import { ValidateActiveSession } from './guards/validate-active-session';
import { ValidateInActiveSession } from './guards/validate-inactive-session';
import { ChangePasswordComponent } from '../components/pages/change-password';
import { ForgotPasswordComponent } from '../components/pages/forgot-password';
import { ResetPasswordComponent } from '../components/pages/reset-password';
import { RegisterCompanyComponent } from '../components/pages/register-company';
import { AccountActivationComponent } from '../components/pages/account-activation';
import { SecurityCheckComponent } from '../components/pages/security-check';

export const appRoutes: Routes = [
    {
        path: 'activation/:token',
        component: AccountActivationComponent,
        canActivate: [ValidateInActiveSession],
        data: {
          breadcrumb: 'Account Activation'
        }
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [ValidateInActiveSession],
        data: {
          breadcrumb: 'Login'
        }
    },
    {
        path: 'login/security-check',
        component: SecurityCheckComponent,
        canActivate: [ValidateInActiveSession],
        data: {
          breadcrumb: 'Security Check'
        }
    },
    {
        path: 'register-company',
        component: RegisterCompanyComponent,
        canActivate: [ValidateInActiveSession],
        data: {
          breadcrumb: 'Register'
        }
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [ValidateInActiveSession],
        data: {
          breadcrumb: 'Forgot Password'
        }
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
        canActivate: [ValidateInActiveSession],
        data: {
          breadcrumb: 'Reset Password'
        }
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [ValidateActiveSession],
        data: {
          breadcrumb: 'Change Password'
        }
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ValidateActiveSession],
        data: {
          breadcrumb: 'Dashboard'
        }
    },
    ...PatientManagerRoutes,
    ...DoctorsRoutes,
    ...MedicalProviderRoutes,
    ...AccountSetupRoutes,
    ...PatientsShellRoutes
];
export const APP_ROUTER_PROVIDER = RouterModule.forRoot(appRoutes);
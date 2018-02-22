import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/pages/login';
// import { PatientManagerRoutes } from './patient-manager-routes';
// import { PatientsShellRoutes } from './patient-routes';
// import { DoctorsRoutes } from './doctors-routes';
// import { MedicalProviderRoutes } from './medical-provider-routes';
// import { AccountSetupRoutes } from './account-setup-routes';
import { ValidateActiveSession } from './guards/validate-active-session';
import { ValidateInActiveSession } from './guards/validate-inactive-session';
import { ChangePasswordComponent } from '../components/pages/change-password';
import { ForgotPasswordComponent } from '../components/pages/forgot-password';
import { ResetPasswordComponent } from '../components/pages/reset-password';
import { RegisterCompanyComponent } from '../components/pages/register-company';
import { AccountActivationComponent } from '../components/pages/account-activation';
import { SecurityCheckComponent } from '../components/pages/security-check';

let accountRoutes: Routes = [
    {
        path: 'reset-password',
        redirectTo: 'account/reset-password'
    },
    {
        path: 'account',
        children: [
            {
                path: 'activation/:token',
                component: AccountActivationComponent,
                canActivate: [ValidateInActiveSession],
                data: {
                    breadcrumb: 'Account Activation'
                }
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
                path: 'security-check',
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
            }
        ]
    }

];
@NgModule({
    imports: [RouterModule.forChild(accountRoutes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
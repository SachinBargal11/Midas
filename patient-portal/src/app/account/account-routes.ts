import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login';
// import { PatientManagerRoutes } from './patient-manager-routes';
// import { PatientsShellRoutes } from './patient-routes';
// import { DoctorsRoutes } from './doctors-routes';
// import { MedicalProviderRoutes } from './medical-provider-routes';
// import { AccountSetupRoutes } from './account-setup-routes';
import { ValidateActiveSession } from '../commons/guards/validate-active-session';
import { ValidateInActiveSession } from '../commons/guards/validate-inactive-session';
import { ChangePasswordComponent } from './components/change-password';
import { ForgotPasswordComponent } from './components/forgot-password';
import { ResetPasswordComponent } from './components/reset-password';
import { AccountActivationComponent } from './components/account-activation';
import { SecurityCheckComponent } from './components/security-check';

let accountRoutes: Routes = [
    {
        path: 'reset-password',
        redirectTo: 'account/reset-password'
    },
    {
        path: '',
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
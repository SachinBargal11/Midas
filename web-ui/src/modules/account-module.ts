import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared-module';

import { AccountActivationComponent } from '../components/pages/account-activation';
import { RegisterCompanyComponent } from '../components/pages/register-company';
import { LoginComponent } from '../components/pages/login';
import { SecurityCheckComponent } from '../components/pages/security-check';
import { ForgotPasswordComponent } from '../components/pages/forgot-password';
import { ResetPasswordComponent } from '../components/pages/reset-password';
import { ChangePasswordComponent } from '../components/pages/change-password';

import { SessionStore } from '../stores/session-store';
import { AuthenticationService } from '../services/authentication-service';
import { RegistrationService } from '../services/registration-service';
import { CompanyStore } from '../stores/company-store';

@NgModule({
      imports: [CommonModule, RouterModule, SharedModule],
      declarations: [
            RegisterCompanyComponent,
            AccountActivationComponent,
            SecurityCheckComponent,
            LoginComponent,
            ForgotPasswordComponent,
            ResetPasswordComponent,
            ChangePasswordComponent
      ],
      providers: [
            SessionStore,
            AuthenticationService,
            CompanyStore,
            RegistrationService
      ]
})
export class AccountModule { }

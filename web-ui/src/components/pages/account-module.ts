import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule }        from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../../scripts/shared-module';

import { AccountActivationComponent } from './account-activation';
import { RegisterCompanyComponent } from './register-company';
import { LoginComponent } from './login';
import { SecurityCheckComponent } from './security-check';
import { SignupComponent } from './signup';
import { ForgotPasswordComponent } from './forgot-password';
import { ResetPasswordComponent } from './reset-password';
import { ChangePasswordComponent } from './change-password';

import { SessionStore } from '../../stores/session-store';
import { AuthenticationService } from '../../services/authentication-service';
import { RegistrationService } from '../../services/registration-service';
import { CompanyStore } from '../../stores/company-store';

@NgModule({
      imports: [CommonModule, RouterModule, ShareModule],
      declarations: [
            RegisterCompanyComponent,
            AccountActivationComponent,
            SecurityCheckComponent,
            LoginComponent,
            SignupComponent,
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

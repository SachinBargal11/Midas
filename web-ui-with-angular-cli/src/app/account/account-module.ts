import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons-module';

import { AccountActivationComponent } from './components/account-activation';
import { RegisterCompanyComponent } from './components/register-company';
import { LoginComponent } from './components/login';
import { SecurityCheckComponent } from './components/security-check';
import { ForgotPasswordComponent } from './components/forgot-password';
import { ResetPasswordComponent } from './components/reset-password';
import { ChangePasswordComponent } from './components/change-password';
import { UserSettingsComponent } from './components/user-settings';

import { NotificationSubscriptionComponent } from './components/notification-subscription';
import { UserSettingsShellComponent } from './components/user-settings-shell';

// import { SessionStore } from '../commons/stores/session-store';
// import { AuthenticationService } from '../services/authentication-service';
// import { RegistrationService } from '../services/registration-service';
// import { CompanyStore } from '../stores/company-store';

import { AccountRoutingModule } from './account-routes';

@NgModule({
      imports: [
            CommonModule,
            RouterModule,
            CommonsModule,
            AccountRoutingModule
      ],
      declarations: [
            RegisterCompanyComponent,
            AccountActivationComponent,
            SecurityCheckComponent,
            LoginComponent,
            ForgotPasswordComponent,
            ResetPasswordComponent,
            ChangePasswordComponent,
            UserSettingsShellComponent,
            NotificationSubscriptionComponent,
            UserSettingsComponent
      ]
})
export class AccountModule { }

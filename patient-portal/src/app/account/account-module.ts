import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons-module';

import { AccountActivationComponent } from './components/account-activation';
import { LoginComponent } from './components/login';
import { SecurityCheckComponent } from './components/security-check';
import { ForgotPasswordComponent } from './components/forgot-password';
import { ResetPasswordComponent } from './components/reset-password';
import { ChangePasswordComponent } from './components/change-password';

import { AccountRoutingModule } from './account-routes';

@NgModule({
      imports: [
            CommonModule,
            RouterModule,
            CommonsModule,
            AccountRoutingModule
      ],
      declarations: [
            AccountActivationComponent,
            SecurityCheckComponent,
            LoginComponent,
            ForgotPasswordComponent,
            ResetPasswordComponent,
            ChangePasswordComponent
      ]
})
export class AccountModule { }

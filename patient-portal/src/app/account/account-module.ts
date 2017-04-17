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
import { DemographicsComponent } from './components/demographics';
import { AddFamilyMemberComponent } from './components/add-family-member';
import { FamilyMemberListComponent } from './components/family-member-list';
import { EditFamilyMemberComponent } from './components/edit-family-member';
import { PatientEmployerComponent } from './components/employer';
import { PatientBasicComponent } from './components/patient-basic';
import { PatientsShellComponent } from './components/patients-shell';
import { PatientNavComponent } from './patient-nav-bar';

import { EmployerService } from './services/employer-service';
import { FamilyMemberService } from './services/family-member-service';
import { PatientsService } from './services/patients-service';
import { InsuranceService } from './services/insurance-service';
import { EmployerStore } from './stores/employer-store';
import { FamilyMemberStore } from './stores/family-member-store';
import { PatientsStore } from './stores/patients-store';
import { InsuranceStore } from './stores/insurance-store';

import { AccountRoutingModule } from './account-routes';
import { AdjusterMasterStore } from '../account-setup/stores/adjuster-store';
import { AdjusterMasterService } from '../account-setup/services/adjuster-service';



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
            ChangePasswordComponent,
            DemographicsComponent,
            AddFamilyMemberComponent,
            FamilyMemberListComponent,
            EditFamilyMemberComponent,
            PatientEmployerComponent,
            PatientBasicComponent,
            PatientsShellComponent,
            PatientNavComponent
      ],
      providers: [
            EmployerService,
            FamilyMemberService,
            PatientsService,
            InsuranceService,
            EmployerStore,
            FamilyMemberStore,
            PatientsStore,
            InsuranceStore,AdjusterMasterStore,AdjusterMasterService
      ]
})
export class AccountModule { }

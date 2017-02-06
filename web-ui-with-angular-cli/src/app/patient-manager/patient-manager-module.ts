import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons-module';
import { AddPatientComponent } from './patients/components/add-patient';
import { AppointmentsComponent } from './patients/components/appointments';
import { BalancesComponent } from './patients/components/balances';
import { DemographicsComponent } from './patients/components/demographics';
import { DocumentsComponent } from './patients/components/documents';
import { InsurancesComponent } from './patients/components/insurances';
import { PatientBasicComponent } from './patients/components/patient-basic';
import { PatientDetailsComponent } from './patients/components/patient-details';
import { PatientNavComponent } from './patients/components/patient-nav-bar';
import { PatientsListComponent } from './patients/components/patients-list';
import { PatientsManagerShellComponent } from './patients-manager-shell';
import { PatientsShellComponent } from './patients/components/patients-shell';
import { PatientProfileComponent } from './patients/components/profile-patient';
import { AddFamilyMemberComponent } from './patients/components/add-family-member';
import { AccidentInfoComponent } from './patients/components/accident';
import { AttorneyComponent } from './patients/components/attorney';
import { ConsentFormsComponent } from './consent-forms/components/consent-forms';
import { ReferalsComponent } from './referals/components/referals';
import { PatientsService } from './patients/services/patients-service';
import { PatientsStore } from './patients/stores/patients-store';
import { PatientRoutingModule } from './patient-manager-routes';
import { AddCaseShellComponent } from './cases/components/add-case-shell';
import { CaseComponent } from './cases/components/case';
import { CasesListComponent } from './cases/components/cases-list';
import { EmployeeComponent} from './cases/components/employee';
import { InsuranceComponent } from './cases/components/insurances';
import { AccidentComponent } from './cases/components/accident';
import { CasesStore } from './cases/stores/case-store';
//  import { CasesStore } from './cases/services/cases-services;

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonsModule,
        PatientRoutingModule
    ],
    declarations: [
        AddPatientComponent,
        AppointmentsComponent,
        BalancesComponent,
        DemographicsComponent,
        DocumentsComponent,
        InsurancesComponent,
        PatientBasicComponent,
        PatientDetailsComponent,
        PatientNavComponent,
        PatientsListComponent,
        PatientsManagerShellComponent,
        PatientsShellComponent,
        PatientProfileComponent,
        AddFamilyMemberComponent,
        AccidentInfoComponent,
        AttorneyComponent,
        ConsentFormsComponent,
        ReferalsComponent,
        CaseComponent,CasesListComponent,
        EmployeeComponent,
        InsuranceComponent,
        AccidentComponent,
        AddCaseShellComponent
    ],
    providers: [
        PatientsService,
        PatientsStore,
        CasesStore
    ]
})
export class PatientManagerModule { }

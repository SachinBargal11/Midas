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
import { PatientEmployerComponent } from './patients/components/employer';
import { ConsentFormsComponent } from './consent-forms/components/consent-forms';
import { ReferalsComponent } from './referals/components/referals';
import { PatientsService } from './patients/services/patients-service';
import { AccidentService } from './patients/services/accident-services';
import { AttorneyService } from './patients/services/attorney-services';
import { EmployerService } from './patients/services/employer-service';
import { FamilyMemberService } from './patients/services/family-member-service';
import { InsuranceService } from './patients/services/insurance-service';
import { PatientsStore } from './patients/stores/patients-store';
import { EmployerStore } from './patients/stores/employer-store';
import { FamilyMemberStore } from './patients/stores/family-member-store';
import { AccidentStore } from './patients/stores/accident-store';
import { AttorneyStore } from './patients/stores/attorney-store';
import { InsuranceStore } from './patients/stores/insurance-store';
import { PatientRoutingModule } from './patient-manager-routes';
import { AddCaseShellComponent } from './cases/components/add-case-shell';
import { CaseComponent } from './cases/components/case';
import { CasesListComponent } from './cases/components/cases-list';
import { EmployerComponent} from './cases/components/employer';
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
        PatientEmployerComponent,
        ConsentFormsComponent,
        ReferalsComponent,
        CaseComponent,
        CasesListComponent,
        EmployerComponent,
        InsuranceComponent,
        AccidentComponent,
        AddCaseShellComponent
    ],
    providers: [
        PatientsService,
        EmployerService,
        FamilyMemberService,
        InsuranceService,
        AccidentService,
        AttorneyService,
        PatientsStore,
        EmployerStore,
        FamilyMemberStore,
        InsuranceStore,
        CasesStore,
        AttorneyStore,
        AccidentStore
    ]
})
export class PatientManagerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons-module';
import { AddPatientComponent } from './patients/components/add-patient';
import { AppointmentsComponent } from './patients/components/appointments';
import { BalancesComponent } from './patients/components/balances';
import { DemographicsComponent } from './patients/components/demographics';
import { DocumentsComponent } from './patients/components/documents';
import { PatientBasicComponent } from './patients/components/patient-basic';
import { PatientDetailsComponent } from './patients/components/patient-details';
import { PatientNavComponent } from './patients/components/patient-nav-bar';
import { PatientsListComponent } from './patients/components/patients-list';
import { PatientsManagerShellComponent } from './patients-manager-shell';
import { PatientsShellComponent } from './patients/components/patients-shell';
import { PatientProfileComponent } from './patients/components/profile-patient';
import { AddFamilyMemberComponent } from './patients/components/add-family-member';
import { FamilyMemberListComponent } from './patients/components/family-member-list';
import { EditFamilyMemberComponent } from './patients/components/edit-family-member';
import { AccidentInfoComponent } from './patients/components/accident';
import { AttorneyComponent } from './patients/components/attorney';
import { PatientEmployerComponent } from './patients/components/employer';
import { ReferringOfficeListComponent } from './patients/components/referring-office-list';
import { AddReferringOfficeComponent } from './patients/components/add-referring-office';
import { EditReferringOfficeComponent } from './patients/components/edit-referring-office';
import { InsuranceListComponent } from './patients/components/insurance-list';
import { AddInsuranceComponent } from './patients/components/add-insurance';
import { EditInsuranceComponent } from './patients/components/edit-insurance';
import { ConsentFormsComponent } from './consent-forms/components/consent-forms';
import { ReferalsComponent } from './referals/components/referals';
import { PatientsService } from './patients/services/patients-service';
import { AccidentService } from './patients/services/accident-services';
import { AttorneyService } from './patients/services/attorney-services';
import { EmployerService } from './patients/services/employer-service';
import { FamilyMemberService } from './patients/services/family-member-service';
import { InsuranceService } from './patients/services/insurance-service';
import { ReferringOfficeService } from './patients/services/referring-office-service';
import { PatientsStore } from './patients/stores/patients-store';
import { EmployerStore } from './patients/stores/employer-store';
import { FamilyMemberStore } from './patients/stores/family-member-store';
import { AccidentStore } from './patients/stores/accident-store';
import { AttorneyStore } from './patients/stores/attorney-store';
import { InsuranceStore } from './patients/stores/insurance-store';
import { ReferringOfficeStore } from './patients/stores/referring-office-store';
import { PatientRoutingModule } from './patient-manager-routes';
import { CaseComponent } from './cases/components/case';
import { CasesListComponent } from './cases/components/cases-list';
import { CasesStore } from './cases/stores/case-store';
import { ViewAllComponent } from './patients/components/view-all';

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
        PatientBasicComponent,
        PatientDetailsComponent,
        PatientNavComponent,
        PatientsListComponent,
        PatientsManagerShellComponent,
        PatientsShellComponent,
        PatientProfileComponent,
        AddFamilyMemberComponent,
        FamilyMemberListComponent,
        EditFamilyMemberComponent,
        AccidentInfoComponent,
        AttorneyComponent,
        PatientEmployerComponent,
        AddInsuranceComponent,
        ReferringOfficeListComponent,
        AddReferringOfficeComponent,
        EditReferringOfficeComponent,
        InsuranceListComponent,
        EditInsuranceComponent,
        ConsentFormsComponent,
        ReferalsComponent,
        CaseComponent,
        CasesListComponent,
        ViewAllComponent
    ],
    providers: [
        PatientsService,
        EmployerService,
        FamilyMemberService,
        InsuranceService,
        ReferringOfficeService,
        AccidentService,
        AttorneyService,
        PatientsStore,
        EmployerStore,
        FamilyMemberStore,
        InsuranceStore,
        ReferringOfficeStore,
        CasesStore,
        AttorneyStore,
        AccidentStore
    ]
})
export class PatientManagerModule { }

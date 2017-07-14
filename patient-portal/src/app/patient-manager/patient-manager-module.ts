import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from '../commons/commons-module';
import { AddPatientComponent } from './patients/components/add-patient';
// import { AppointmentsComponent } from './patients/components/appointments';
// import { BalancesComponent } from './patients/components/balances';
import { DemographicsComponent } from './patients/components/demographics';
import { DocumentsComponent } from './patients/components/documents';
import { PatientBasicComponent } from './patients/components/patient-basic';
import { PatientNavComponent } from './patients/components/patient-nav-bar';
import { PatientsListComponent } from './patients/components/patients-list';
import { PatientsManagerShellComponent } from './patients-manager-shell';
import { PatientsShellComponent } from './patients/components/patients-shell';
import { AddFamilyMemberComponent } from './patients/components/add-family-member';
import { FamilyMemberListComponent } from './patients/components/family-member-list';
import { EditFamilyMemberComponent } from './patients/components/edit-family-member';
import { AccidentInfoComponent } from './cases/components/accident';
// import { AttorneyComponent } from './patients/components/attorney';
import { PatientEmployerComponent } from './patients/components/employer';
import { CaseShellComponent } from './cases/components/cases-shell';
import { EditReferringOfficeComponent } from './cases/components/edit-referring-office';
import { InsuranceListComponent } from './patients/components/insurance-list';
import { AddInsuranceComponent } from './patients/components/add-insurance';
import { EditInsuranceComponent } from './patients/components/edit-insurance';
import { PatientsService } from './patients/services/patients-service';
import { AccidentService } from './cases/services/accident-services';
import { AttorneyService } from './patients/services/attorney-services';
import { EmployerService } from './patients/services/employer-service';
import { FamilyMemberService } from './patients/services/family-member-service';
import { InsuranceService } from './patients/services/insurance-service';
import { ReferringOfficeService } from './cases/services/referring-office-service';
import { PatientsStore } from './patients/stores/patients-store';
import { EmployerStore } from './patients/stores/employer-store';
import { FamilyMemberStore } from './patients/stores/family-member-store';
import { AccidentStore } from './cases/stores/accident-store';
import { AttorneyStore } from './patients/stores/attorney-store';
import { InsuranceStore } from './patients/stores/insurance-store';
import { ReferringOfficeStore } from './cases/stores/referring-office-store';
import { PatientRoutingModule } from './patient-manager-routes';
import { CaseBasicComponent } from './cases/components/case-basic';
import { CasesListComponent } from './cases/components/cases-list';
//import { InsuranceMapComponent } from './cases/components/insurance-mapping';
//import { CaseMappingComponent } from './cases/components/case-mapping';
import { CasesStore } from './cases/stores/case-store';
import { InsuranceMappingStore } from './cases/stores/insurance-mapping-store';
import { InsuranceMappingService } from './cases/services/insurance-mapping-service';
import { ViewAllComponent } from './patients/components/view-all';
import { CaseService } from './cases/services/cases-services';
import { AdjusterMasterStore } from '../account-setup/stores/adjuster-store';
import { AdjusterMasterService } from '../account-setup/services/adjuster-service';


// import { PatientVisitComponent } from './patient-visit/components/patient-visit';
// import { PatientVisitsStore } from './patient-visit/stores/patient-visit-store';
// import { PatientVisitService } from './patient-visit/services/patient-visit-service';

// import { RoomsModule } from '../medical-provider/rooms/rooms-module';
// import { UsersModule } from '../medical-provider/users/users-module';

//import { ConsentShellRoutingModule } from './consentForm/consent-form-routes';


import { AddCompanyConsentComponent } from './consentForm/components/add-company-consent';

import { ListCompanyConsentComponent } from './consentForm/components/list-company-consent'
import { EditCompanyConsentComponent } from './consentForm/components/edit-company-consent'

import { ConsentListComponent } from './cases/components/list-consent';
import { AddConsentComponent } from './cases/components/add-consent';
import { ConsentStore } from './cases/stores/consent-store';
import { ConsentService } from './cases/services/consent-service';

import { CompanyCasesComponent } from './cases/components/company-cases-list';
import { AddCaseComponent } from './cases/components/add-case';
import { PatientVisitListComponent } from './cases/components/patient-visits-list';
import { PatientVisitNotesComponent } from './cases/components/patient-visit-notes';
import { PatientVisitListShellComponent } from './cases/components/patient-visit-list-shell';
import { VisitDocumentsUploadComponent } from './cases/components/visit-document';
import { CaseDocumentsUploadComponent } from './cases/components/case-documents';
import { InsuranceMappingComponent } from './cases/components/insurance-mapping';
import { AssignInsuranceComponent } from './cases/components/assign-insurance';
import { EditConsentComponent } from './cases/components/edit-consent';
import { LocationsStore } from '../medical-provider/locations/stores/locations-store';
import { LocationsService } from '../medical-provider/locations/services/locations-service';
import { AttorneyMasterStore } from '../account-setup/stores/attorney-store';
import { AttorneyMasterService } from '../account-setup/services/attorney-service';

import { PatientVisitComponent } from './patient-visit/components/patient-visit';
import { PatientVisitsStore } from './patient-visit/stores/patient-visit-store';
import { PatientVisitService } from './patient-visit/services/patient-visit-service';

import { RoomsModule } from '../medical-provider/rooms/rooms-module';
import { UsersModule } from '../medical-provider/users/users-module';
import { DocumentsUploadComponent } from './cases/components/documents';

import { ReferralService } from './cases/services/referral-service';
import { ReferralStore } from './cases/stores/referral-store';

import { VisitShellComponent } from './cases/components/visit-shell';
import { PatientVisitListDoctorComponent } from './cases/components/doctor-visit';
import { PatientVisitListTreatingRoomComponent } from './cases/components/treatingroom-visit';
import { VisitReferralStore } from './patient-visit/stores/visit-referral-store';
import { VisitReferralService } from './patient-visit/services/visit-referral-service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonsModule,
        PatientRoutingModule,
        // , ConsentShellRoutingModule
        RoomsModule,
        UsersModule
    ],
    declarations: [
        AddPatientComponent,
        // AppointmentsComponent,
        // BalancesComponent,
        DemographicsComponent,
        DocumentsComponent,
        PatientBasicComponent,
        PatientNavComponent,
        PatientsListComponent,
        PatientsManagerShellComponent,
        PatientsShellComponent,
        AddFamilyMemberComponent,
        FamilyMemberListComponent,
        EditFamilyMemberComponent,
        AccidentInfoComponent,
        // AttorneyComponent,
        PatientEmployerComponent,
        AddInsuranceComponent,
        CaseShellComponent,
        EditReferringOfficeComponent,
        InsuranceListComponent,
        EditInsuranceComponent,
        // ConsentFormsComponent,
        // ReferalsComponent,
        CasesListComponent,
        // PatientVisitComponent,
        CaseBasicComponent,
        // InsuranceMapComponent,
        // CaseMappingComponent,
        ViewAllComponent, 
        AddCompanyConsentComponent, 
        ListCompanyConsentComponent, 
        EditCompanyConsentComponent, 
        ConsentListComponent, 
        AddConsentComponent, 
        CompanyCasesComponent, 
        AddCaseComponent, 
        PatientVisitListComponent,
        PatientVisitNotesComponent,
        CaseDocumentsUploadComponent,
        PatientVisitListShellComponent,
        VisitDocumentsUploadComponent, 
        InsuranceMappingComponent, 
        AssignInsuranceComponent, 
        EditConsentComponent, 
        PatientVisitComponent, 
        DocumentsUploadComponent,
        VisitShellComponent,
        PatientVisitListDoctorComponent,
        PatientVisitListTreatingRoomComponent,
    ],
    providers: [
        PatientsService,
        EmployerService,
        FamilyMemberService,
        InsuranceService,
        ReferringOfficeService,
        AccidentService,
        AttorneyService,
        CaseService,
        InsuranceMappingService,
        PatientsStore,
        EmployerStore,
        FamilyMemberStore,
        InsuranceStore,
        ReferringOfficeStore,
        CasesStore,
        AttorneyStore,
        AccidentStore,
        InsuranceMappingStore,
        AdjusterMasterStore,
        AdjusterMasterService,
        ConsentStore,
        ConsentService,
        // PatientVisitsStore,
        // PatientVisitService, 
        LocationsStore,
        LocationsService,
        AttorneyMasterStore, 
        AttorneyMasterService,
        PatientVisitsStore,
        PatientVisitService,
        ReferralService,
        ReferralStore,
        VisitReferralStore,
        VisitReferralService
    ]
})
export class PatientManagerModule { }

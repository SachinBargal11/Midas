import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from '../commons/commons-module';
import { AddPatientComponent } from './patients/components/add-patient';
// import { AppointmentsComponent } from './patients/components/appointments';
// import { BalancesComponent } from './patients/components/balances';
import { DemographicsComponent } from './patients/components/demographics';
// import { DocumentsComponent } from './patients/components/documents';
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
import { ReferringOfficeListComponent } from './cases/components/referring-office-list';
import { AddReferringOfficeComponent } from './cases/components/add-referring-office';
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
import { InsuranceMapComponent } from './cases/components/insurance-mapping';
import { CaseMappingComponent } from './cases/components/case-mapping';
import { CasesStore } from './cases/stores/case-store';
import { InsuranceMappingStore } from './cases/stores/insurance-mapping-store';
import { InsuranceMappingService } from './cases/services/insurance-mapping-service';
import { ViewAllComponent } from './patients/components/view-all';


import { CaseService } from './cases/services/cases-services';
import { AdjusterMasterStore } from './patients/stores/adjuster-store';
import { AdjusterMasterService } from './patients/services/adjuster-service';

// import { PatientVisitComponent } from './patient-visit/components/patient-visit';
// import { PatientVisitsStore } from './patient-visit/stores/patient-visit-store';
// import { PatientVisitService } from './patient-visit/services/patient-visit-service';

// import { RoomsModule } from '../medical-provider/rooms/rooms-module';
// import { UsersModule } from '../medical-provider/users/users-module';

import { ConsentShellRoutingModule } from './consentForm/consent-form-routes';


import { AddDocConsentFormComponent } from './consentForm/components/add-consent-form';
import { ConsentDocListComponent } from './consentForm/components/list-consent-form'




import { AddDocConsentFormService } from './consentForm/services/consent-form-service';
import { EditDocConsentFormComponent } from './consentForm/components/edit-consent-form'
import { AddDocConsentStore } from './consentForm/stores/add-consent-form-store';
import { ListDocConsentStore } from './consentForm/stores/list-consent-form-store';


import { ListDocConsentFormService } from './consentForm/services/list-consent-form-service';

import { ListConsentFormService } from './cases/services/list-consent-form-service';

import { AddConsentFormService } from './cases/services/consent-form-service';
import { AddConsentStore } from './cases/stores/add-consent-form-store';
import { AddConsentFormComponent } from './cases/components/add-consent-form';
import { ConsentListComponent } from './cases/components/list-consent-form'
import { EditConsentFormComponent } from './cases/components/edit-consent-form';
import { ListConsentStore } from './cases/stores/list-consent-form-store';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonsModule,
        PatientRoutingModule
        , ConsentShellRoutingModule
        // RoomsModule,
        // UsersModule
    ],
    declarations: [
        AddPatientComponent,
        // AppointmentsComponent,
        // BalancesComponent,
        DemographicsComponent,
        // DocumentsComponent,
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
        ReferringOfficeListComponent,
        AddReferringOfficeComponent,
        EditReferringOfficeComponent,
        InsuranceListComponent,
        EditInsuranceComponent,
        // ConsentFormsComponent,
        // ReferalsComponent,
        CasesListComponent,
        // PatientVisitComponent,
        CaseBasicComponent,
        InsuranceMapComponent,
        CaseMappingComponent,
        ViewAllComponent, AddDocConsentFormComponent
        , ConsentListComponent, AddConsentFormComponent
        , EditConsentFormComponent, ConsentDocListComponent, EditDocConsentFormComponent
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
        AdjusterMasterService, AddConsentStore, AddConsentFormService, ListConsentStore, ListConsentFormService
        , ListDocConsentStore, AddDocConsentStore,ListDocConsentFormService,AddDocConsentFormService
        // PatientVisitsStore,
        // PatientVisitService
    ]
})
export class PatientManagerModule { }
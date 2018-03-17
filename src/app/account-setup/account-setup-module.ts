import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons-module';
// import { AddSpecialityComponent } from './components/speciality/add-speciality';
import { SpecialityListComponent } from './components/speciality/speciality-list';
import { AdjusterMasterListComponent } from './components/AdjusterMaster/adjuster-master-list';
import { AddAdjusterComponent } from './components/AdjusterMaster/add-adjuster';
import { EditAdjusterComponent } from './components/AdjusterMaster/edit-adjuster';
import { AttorneyMasterListComponent } from './components/AttorneyMaster/attorney-master-list';
import { AddAttorneyComponent } from './components/AttorneyMaster/add-attorney';
import { EditAttorneyComponent } from './components/AttorneyMaster/edit-attorney';
import { SpecialityShellComponent } from './components/speciality/speciality-shell';
// import { UpdateSpecialityComponent } from './components/speciality/update-speciality';
import { AddSpecialityDetailsComponent } from './components/speciality-details/add-speciality-detail';
import { EditSpecialityDetailsComponent } from './components/speciality-details/edit-speciality-detail';
// import { SpecialityDetailComponent } from './components/speciality-details/speciality-details';
import { AddInsuranceMasterComponent } from './components/insurance-master/add-insurance-master';
import { EditInsuranceMasterComponent } from './components/insurance-master/edit-insurance-master';
import { InsuranceMasterListComponent } from './components/insurance-master/insurance-master-list';

import { AccountSetupNavComponent } from './components/navigation/account-setup-nav-bar';
import { AccountSetupShellComponent } from './account-setup-shell';
import { AccountSetupRoutingModule } from './account-setup-routes';

import { SpecialityService } from './services/speciality-service';
import { SpecialityDetailsService } from './services/speciality-details-service';
import { SpecialityStore } from './stores/speciality-store';
import { SpecialityDetailsStore } from './stores/speciality-details-store';
import { AdjusterMasterStore } from './stores/adjuster-store';
import { AdjusterMasterService } from './services/adjuster-service';
import { AttorneyMasterStore } from './stores/attorney-store';
import { AttorneyMasterService } from './services/attorney-service';
import { InsuranceMasterService } from './services/insurance-master-service';
import { InsuranceMasterStore } from './stores/insurance-master-store';

import { InsuranceStore } from '../patient-manager/patients/stores/insurance-store';
import { InsuranceService } from '../patient-manager/patients/services/insurance-service';

import { MedicalProviderListComponent } from './components/medical-provider-master/medical-provider-list';
// import { MedicalProviderMasterService } from './services/medical-provider-master-service';
// import { MedicalProviderMasterStore } from './stores/medical-provider-master-store';
// import { AddMedicalProviderComponent } from './components/medical-provider-master/add-medical-provider';
import { EditMedicalProviderComponent } from './components/medical-provider-master/edit-medical-provider';

import { AccountSettingShellComponent } from './components/account-setting/account-setting-shell';
import { ProcedureCodeComponent } from './components/account-setting/procedure-code-master';
import { AddProcedureCodeComponent } from './components/account-setting/add-procedure-code-master';
import { AddDiagnosisCodeComponent } from './components/account-setting/add-diagnosis-code-master';
import { DiagnosisCodeMasterComponent } from './components/account-setting/diagnosis-code-master';
import { DocumentTypeComponent } from './components/account-setting/document-type';
import { RoomsStore } from '../medical-provider/rooms/stores/rooms-store';
import { RoomsService } from '../medical-provider/rooms/services/rooms-service';

import { ProcedureCodeMasterService } from './services/procedure-code-master-service';
import { ProcedureCodeMasterStore } from './stores/procedure-code-master-store';
import { DiagnosisCodeMasterService } from './services/diagnosis-code-master-service';
import { DiagnosisCodeMasterStore } from './stores/diagnosis-code-master-store';
import { DocumentTypeStore } from './stores/document-type-store';
import { DocumentTypeService } from './services/document-type-service';

import { AccountGeneralSettingComponent } from './components/account-setting/account-general-settings'

import { AncillaryListComponent } from './components/ancillary-master/ancillary-master-list';
import { AddAncillaryComponent } from './components/ancillary-master/add-ancillary-master';
import { GeneralSettingStore } from './stores/general-settings-store';
import { GeneralSettingService } from './services/general-settings-service';
import { AncillaryMasterStore } from './stores/ancillary-store';
import { AncillaryMasterService } from './services/ancillary-service';
import { EditAncillaryComponent } from './components/ancillary-master/edit-ancillary-master';
import { AddTestSpecialityDetailsComponent } from './components/test-speciality-details/add-test-speciality-details';
import{ EditTestSpecialityDetailsComponent } from './components/test-speciality-details/edit-test-speciality-details';
import { TestSpecialityDetailsService } from'./services/test-speciality-details-service';
import { TestSpecialityDetailsStore } from './stores/test-speciality-details-store';




// AccountSettingShellComponent
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonsModule,
        AccountSetupRoutingModule
    ],
    declarations: [
        AccountSetupNavComponent,
        AccountSetupShellComponent,
        SpecialityListComponent,
        SpecialityShellComponent,
        AddSpecialityDetailsComponent,
        EditSpecialityDetailsComponent,
        AdjusterMasterListComponent,
        AddAdjusterComponent,
        EditAdjusterComponent,
        AddAttorneyComponent,
        EditAttorneyComponent,
        AttorneyMasterListComponent,
        AddInsuranceMasterComponent,
        EditInsuranceMasterComponent,
        InsuranceMasterListComponent,
        MedicalProviderListComponent,
        // AddMedicalProviderComponent,
        EditMedicalProviderComponent,
        AccountSettingShellComponent,
        ProcedureCodeComponent,
        AddProcedureCodeComponent,
        DocumentTypeComponent,
        AccountGeneralSettingComponent,
        AncillaryListComponent, 
        AddAncillaryComponent, 
        EditAncillaryComponent,
        AddTestSpecialityDetailsComponent,
        EditTestSpecialityDetailsComponent,
        DiagnosisCodeMasterComponent,
        AddDiagnosisCodeComponent
    ],
    providers: [
        SpecialityService,
        SpecialityStore,
        SpecialityDetailsService,
        SpecialityDetailsStore,
        TestSpecialityDetailsService,
        TestSpecialityDetailsStore,
        AdjusterMasterStore,
        AdjusterMasterService,
        InsuranceStore,
        InsuranceService,
        AttorneyMasterService,
        AttorneyMasterStore,
        InsuranceMasterService,
        InsuranceMasterStore,
        // MedicalProviderMasterService,
        // MedicalProviderMasterStore
        RoomsStore,
        RoomsService,
        ProcedureCodeMasterService,
        ProcedureCodeMasterStore,
        DiagnosisCodeMasterService,
        DiagnosisCodeMasterStore,
        DocumentTypeStore,
        DocumentTypeService,
        GeneralSettingStore, 
        GeneralSettingService, 
        AncillaryMasterStore, 
        AncillaryMasterService
    ]
})
export class AccountSetupModule { }

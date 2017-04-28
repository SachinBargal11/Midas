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
import { MedicalProviderMasterService } from './services/medical-provider-master-service';
import { MedicalProviderMasterStore } from './stores/medical-provider-master-store';
import { AddMedicalProviderComponent } from './components/medical-provider-master/add-medical-provider';



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
        AddMedicalProviderComponent

    ],
    providers: [
        SpecialityService,
        SpecialityStore,
        SpecialityDetailsService,
        SpecialityDetailsStore,
        AdjusterMasterStore,
        AdjusterMasterService,
        InsuranceStore,
        InsuranceService,
        AttorneyMasterService,
        AttorneyMasterStore,
        InsuranceMasterService,
        InsuranceMasterStore,
        MedicalProviderMasterService
        , MedicalProviderMasterStore
    ]
})
export class AccountSetupModule { }

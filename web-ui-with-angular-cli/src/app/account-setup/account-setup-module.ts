import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons-module';
// import { AddSpecialityComponent } from './components/speciality/add-speciality';
import { SpecialityListComponent } from './components/speciality/speciality-list';
import { AdjusterMasterListComponent } from './components/AdjusterMaster/adjuster-master-list';
import { AddAdjusterComponent } from './components/AdjusterMaster/add-adjuster';
import { EditAdjusterComponent } from './components/AdjusterMaster/edit-adjuster';
import { SpecialityShellComponent } from './components/speciality/speciality-shell';
// import { UpdateSpecialityComponent } from './components/speciality/update-speciality';
import { AddSpecialityDetailsComponent } from './components/speciality-details/add-speciality-detail';
import { EditSpecialityDetailsComponent } from './components/speciality-details/edit-speciality-detail';
// import { SpecialityDetailComponent } from './components/speciality-details/speciality-details';
import { AccountSetupNavComponent } from './components/navigation/account-setup-nav-bar';
import { AccountSetupShellComponent } from './account-setup-shell';
import { AccountSetupRoutingModule } from './account-setup-routes';
import { SpecialityService } from './services/speciality-service';
import { SpecialityDetailsService } from './services/speciality-details-service';
import { SpecialityStore } from './stores/speciality-store';
import { SpecialityDetailsStore } from './stores/speciality-details-store';
import { AdjusterMasterStore } from './stores/adjuster-store';
import { AdjusterMasterService } from './services/adjuster-service';
import { InsuranceStore } from '../patient-manager/patients/stores/insurance-store';
import { InsuranceService } from '../patient-manager/patients/services/insurance-service';

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
        EditAdjusterComponent

    ],
    providers: [
        SpecialityService,
        SpecialityStore,
        SpecialityDetailsService,
        SpecialityDetailsStore,
        AdjusterMasterStore,
        AdjusterMasterService,
        InsuranceStore,
        InsuranceService



    ]
})
export class AccountSetupModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared-module';
import { AddSpecialityComponent } from '../components/pages/account-setup/speciality/add-speciality';
import { SpecialityListComponent } from '../components/pages/account-setup/speciality/speciality-list';
import { SpecialityShellComponent } from '../components/pages/account-setup/speciality/speciality-shell';
import { UpdateSpecialityComponent } from '../components/pages/account-setup/speciality/update-speciality';
import { AddSpecialityDetailsComponent } from '../components/pages/account-setup/speciality-details/add-speciality-detail';
import { EditSpecialityDetailsComponent } from '../components/pages/account-setup/speciality-details/edit-speciality-detail';
import { SpecialityDetailComponent } from '../components/pages/account-setup/speciality-details/speciality-details';
import { SpecialityService } from '../services/speciality-service';
import { SpecialityDetailsService } from '../services/speciality-details-service';
import { SpecialityStore } from '../stores/speciality-store';
import { SpecialityDetailsStore } from '../stores/speciality-details-store';
import { AccountSetupNavComponent } from '../components/pages/account-setup/account-setup-nav-bar';
import { AccountSetupShellComponent } from '../components/pages/account-setup/account-setup-shell';
import { AccountSetupRoutingModule } from '../routes/account-setup-routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        AccountSetupRoutingModule
    ],
    declarations: [
        AccountSetupNavComponent,
        AccountSetupShellComponent,
        AddSpecialityComponent,
        SpecialityListComponent,
        SpecialityShellComponent,
        UpdateSpecialityComponent,
        AddSpecialityDetailsComponent,
        EditSpecialityDetailsComponent,
        SpecialityDetailComponent
    ],
    providers: [
        SpecialityService,
        SpecialityStore,
        SpecialityDetailsService,
        SpecialityDetailsStore

    ]
})
export class AccountSetupModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons-module';
// import { AddSpecialityComponent } from './components/speciality/add-speciality';
import { SpecialityListComponent } from './components/speciality/speciality-list';
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
        EditSpecialityDetailsComponent
       
    ],
    providers: [
        SpecialityService,
        SpecialityStore,
        SpecialityDetailsService,
        SpecialityDetailsStore

    ]
})
export class AccountSetupModule { }

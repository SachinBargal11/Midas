/** Angular Modules */

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { enableProdMode, NgModule } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppRoot } from '../components/AppRoot';
import { NoContentComponent } from '../components/pages/no-content/no-content-component';
import { HttpModule } from '@angular/http';

import { RootRoutingModule } from '../routes/root-routes';
import { SharedModule } from './shared-module';
import { AppModule } from './app-module';
import { AccountModule } from './account-module';
import { PatientModule } from './patient-module';
import { AccountSetupModule } from './account-setup-module';
import { MedicalProviderModule } from './medical-provider-module';

import { AuthenticationService } from '../services/authentication-service';
import { SessionStore } from '../stores/session-store';
import { NotificationsStore } from '../stores/notifications-store';
import { ProgressBarService } from '../services/progress-bar-service';

import { ValidateActiveSession } from '../routes/guards/validate-active-session';
import { ValidateInActiveSession } from '../routes/guards/validate-inactive-session';

import { RegistrationService } from '../services/registration-service';
import { CompanyStore } from '../stores/company-store';

import { StatesStore } from '../stores/states-store';
import { StateService } from '../services/state-service';

import { DoctorsStore } from '../stores/doctors-store';
import { DoctorsService } from '../services/doctors-service';

import { SpecialityStore } from '../stores/speciality-store';
import { SpecialityService } from '../services/speciality-service';

import { UsersService } from '../services/users-service';
import { UsersStore } from '../stores/users-store';
// enableProdMode();

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        SharedModule,
        RootRoutingModule,
        AppModule,
        AccountModule,
        PatientModule,
        AccountSetupModule,
        MedicalProviderModule
    ],
    declarations: [
        AppRoot,
        NoContentComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ValidateActiveSession,
        ValidateInActiveSession,
        FormBuilder,
        SessionStore,
        CompanyStore,
        RegistrationService,
        AuthenticationService,
        NotificationsStore,
        StateService,
        StatesStore,
        DoctorsStore,
        DoctorsService,
        ProgressBarService,
        SpecialityStore,
        SpecialityService,
        UsersService,
        UsersStore
    ],
    bootstrap: [
        AppRoot
    ]
})
export class RootModule {
}

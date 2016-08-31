
/** Angular Modules */

import {enableProdMode, NgModule} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AppRoot} from '../components/AppRoot';
import {provide} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {InputTextModule, DataTableModule, ButtonModule, DialogModule} from 'primeng/primeng';
import {SimpleNotificationsModule} from 'angular2-notifications';

/** Application Services and Providers */

import {SessionStore} from '../stores/session-store';
import {AuthenticationService} from '../services/authentication-service';

import {UsersStore} from '../stores/users-store';
import {UsersService} from '../services/users-service';

import {ProvidersStore} from '../stores/providers-store';
import {ProvidersService} from '../services/providers-service';

import {MedicalFacilityStore} from '../stores/medical-facilities-store';
import {MedicalFacilityService} from '../services/medical-facility-service';

import {DoctorsStore} from '../stores/doctors-store';
import {DoctorsService} from '../services/doctors-service';

import {PatientsStore} from '../stores/patients-store';
import {PatientsService} from '../services/patients-service';

import {StatesStore} from '../stores/states-store';
import {StateService} from '../services/state-service';

import {NotificationsStore} from '../stores/notifications-store';
import {APP_ROUTER_PROVIDER} from '../routes/app-routes';
import {ValidateActiveSession} from '../routes/guards/validate-active-session';
import {ValidateInActiveSession} from '../routes/guards/validate-inactive-session';

/** Components */

import {LoginComponent} from '../components/pages/login';
import {SignupComponent} from '../components/pages/signup';
import {DashboardComponent} from '../components/pages/dashboard';
import {PatientsShellComponent} from '../components/pages/patients/patients-shell';
import {PatientsListComponent } from '../components/pages/patients/patients-list';
import {AddPatientComponent } from '../components/pages/patients/add-patient';
import {PatientDetailsComponent } from '../components/pages/patients/patient-details';
import {PatientProfileComponent } from '../components/pages/patients/profile-patient';
import {AppHeaderComponent} from '../components/elements/app-header';
import {MainNavComponent} from '../components/elements/main-nav';

import {NotificationComponent} from '../components/elements/notification';
import {ChangePasswordComponent} from '../components/pages/change-password';
import {AddUserComponent} from '../components/pages/users/add-user';
import {UsersListComponent} from '../components/pages/users/users-list';
import {UpdateUserComponent} from '../components/pages/users/update-user';
import {AddProviderComponent} from '../components/pages/providers/add-provider';
import {ProvidersListComponent} from '../components/pages/providers/providers-list';
import {AddMedicalFacilityComponent} from '../components/pages/medical-facilities/add-medical-facility';
import {MedicalFacilitiesListComponent} from '../components/pages/medical-facilities/medical-facilities-list';
import {AddDoctorComponent} from '../components/pages/doctors/add-doctor';
import {UpdateDoctorComponent} from '../components/pages/doctors/update-doctor';
import {DoctorsListComponent} from '../components/pages/doctors/doctors-list';


enableProdMode();

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        APP_ROUTER_PROVIDER,
        InputTextModule,
        DataTableModule,
        ButtonModule,
        DialogModule,
        SimpleNotificationsModule
    ],
    declarations: [
        AppRoot,
        LoginComponent,
        SignupComponent,
        DashboardComponent,
        PatientsListComponent,
        AddPatientComponent,
        PatientDetailsComponent,
        PatientProfileComponent,
        PatientsShellComponent,
        AppHeaderComponent,
        MainNavComponent,
        ChangePasswordComponent,
        AddUserComponent,
        UpdateUserComponent,
        UsersListComponent,
        AddProviderComponent,
        ProvidersListComponent,
        AddMedicalFacilityComponent,
        MedicalFacilitiesListComponent,
        AddDoctorComponent,
        UpdateDoctorComponent,
        DoctorsListComponent
    ],
    providers: [
        SessionStore,
        AuthenticationService,
        UsersStore,
        UsersService,
        ProvidersStore,
        ProvidersService,
        MedicalFacilityStore,
        MedicalFacilityService,
        DoctorsStore,
        DoctorsService,
        PatientsStore,
        PatientsService,
        StatesStore,
        StateService,
        NotificationsStore,
        ValidateActiveSession,
        ValidateInActiveSession,
        Http,
        HTTP_PROVIDERS
    ],
    bootstrap: [
        AppRoot
    ]
})
export class BootStraper {
}
platformBrowserDynamic().bootstrapModule(BootStraper);

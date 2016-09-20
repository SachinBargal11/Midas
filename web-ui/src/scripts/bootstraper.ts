
/** Angular Modules */

import {enableProdMode, NgModule} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule, FormBuilder, ReactiveFormsModule}    from '@angular/forms';
import {AppRoot} from '../components/AppRoot';
import {HttpModule} from '@angular/http';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';

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

import {SpecialityStore} from '../stores/speciality-store';
import {SpecialityService} from '../services/speciality-service';

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
import {LoaderComponent} from '../components/elements/loader';
import {ProgressBarComponent} from '../components/elements/progress-bar';

import {NotificationComponent} from '../components/elements/notification';
import {ChangePasswordComponent} from '../components/pages/change-password';
import {AddUserComponent} from '../components/pages/users/add-user';
import {UsersListComponent} from '../components/pages/users/users-list';
import {UpdateUserComponent} from '../components/pages/users/update-user';
import {AddProviderComponent} from '../components/pages/providers/add-provider';
import {ProvidersListComponent} from '../components/pages/providers/providers-list';
import {UpdateProviderComponent} from '../components/pages/providers/update-provider';
import {UpdateMedicalFacilityComponent} from '../components/pages/medical-facilities/update-medical-facility';
import {AddMedicalFacilityComponent} from '../components/pages/medical-facilities/add-medical-facility';
import {MedicalFacilitiesListComponent} from '../components/pages/medical-facilities/medical-facilities-list';
import {SpecialityDetailsComponent} from '../components/pages/medical-facilities/speciality-details';
import {UpdateSpecialityDetailComponent} from '../components/pages/medical-facilities/update-speciality-detail';
import {AddSpecialityDetailComponent} from '../components/pages/medical-facilities/add-speciality-detail';
import {AddDoctorComponent} from '../components/pages/doctors/add-doctor';
import {UpdateDoctorComponent} from '../components/pages/doctors/update-doctor';
import {DoctorsListComponent} from '../components/pages/doctors/doctors-list';
import {SpecialityListComponent} from '../components/pages/speciality/speciality-list';
import {AddSpecialityComponent} from '../components/pages/speciality/add-speciality';
import {UpdateSpecialityComponent} from '../components/pages/speciality/update-speciality';

import {UserStatisticsComponent} from '../components/pages/users/user-statistics';

import {LimitPipe} from '../pipes/limit-array-pipe';
import {TimeAgoPipe} from '../pipes/time-ago-pipe';
import {ReversePipe} from '../pipes/reverse-array-pipe';
import {MapToJSPipe} from '../pipes/map-to-js';

import {InputTextModule, ChartModule, DataTableModule, SharedModule, ButtonModule, DialogModule, CalendarModule, InputMaskModule, RadioButtonModule, MultiSelectModule} from 'primeng/primeng';



enableProdMode();

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        APP_ROUTER_PROVIDER,
        InputTextModule,
        ChartModule,
        DataTableModule,
        ButtonModule,
        DialogModule,
        SimpleNotificationsModule,
        Ng2BootstrapModule,
        InputMaskModule,
        CalendarModule,
        RadioButtonModule,
        MultiSelectModule,
        HttpModule,
        SharedModule
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
        LoaderComponent,
        ProgressBarComponent,
        ChangePasswordComponent,
        NotificationComponent,
        AddUserComponent,
        UpdateUserComponent,
        UsersListComponent,
        AddProviderComponent,
        UpdateProviderComponent,
        ProvidersListComponent,
        AddMedicalFacilityComponent,
        UpdateMedicalFacilityComponent,
        MedicalFacilitiesListComponent,
        SpecialityDetailsComponent,
        UpdateSpecialityDetailComponent,
        AddSpecialityDetailComponent,
        AddDoctorComponent,
        UpdateDoctorComponent,
        DoctorsListComponent,
        SpecialityListComponent,
        AddSpecialityComponent,
        UpdateSpecialityComponent,
        UserStatisticsComponent,
        TimeAgoPipe,
        ReversePipe,
        LimitPipe,
        MapToJSPipe
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
        SpecialityStore,
        SpecialityService,
        PatientsStore,
        PatientsService,
        StatesStore,
        StateService,
        NotificationsStore,
        ValidateActiveSession,
        ValidateInActiveSession,
        FormBuilder
    ],
    bootstrap: [
        AppRoot
    ]
})
export class BootStraper {
}
platformBrowserDynamic().bootstrapModule(BootStraper);

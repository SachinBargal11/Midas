import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';

import { ConfigService, configServiceFactory } from './config-service';

import { AppComponent } from './app.component';

import { NoContentComponent } from './no-content-component';

import { AppRoutingModule } from './app.routes';
import { CommonsModule } from './commons/commons-module';
import { DashboardModule } from './dashboard/dashboard-module';
import { EventModule } from './event/event-module';

import { AuthenticationService } from './account/services/authentication-service';
import { SessionStore, tokenServiceFactory } from './commons/stores/session-store';
import { NotificationsStore } from './commons/stores/notifications-store';
import { ProgressBarService } from './commons/services/progress-bar-service';
import { ConfirmationService } from 'primeng/primeng';

import { ValidateActiveSession } from './commons/guards/validate-active-session';
import { ValidateInActiveSession } from './commons/guards/validate-inactive-session';
import { ValidateDoctorSession } from './commons/guards/validate-doctor-session';
import { ValidateInActiveDoctorSession } from './commons/guards/validate-inactivedoctor-session';

import { RegistrationService } from './account/services/registration-service';
import { CompanyStore } from './account/stores/company-store';

import { StatesStore } from './commons/stores/states-store';
import { StateService } from './commons/services/state-service';
import { ScannerService } from './commons/services/scanner-service';
import { DocumentUploadService } from './commons/services/document-upload-service';
import { DiagnosisService } from './commons/services/diagnosis-service';
import { DiagnosisStore } from './commons/stores/diagnosis-store';
import { ProcedureStore } from './commons/stores/procedure-store';
import { ProcedureService } from './commons/services/procedure-service';

import { DoctorsStore } from './medical-provider/users/stores/doctors-store';
import { DoctorsService } from './medical-provider/users/services/doctors-service';

import { SpecialityStore } from './account-setup/stores/speciality-store';
import { SpecialityService } from './account-setup/services/speciality-service';

import { UsersService } from './medical-provider/users/services/users-service';
import { UsersStore } from './medical-provider/users/stores/users-store';

import { LocationsStore } from './medical-provider/locations/stores/locations-store';
import { LocationsService } from './medical-provider/locations/services/locations-service';

import { ScheduleStore } from './medical-provider/locations/stores/schedule-store';
import { ScheduleService } from './medical-provider/locations/services/schedule-service';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

import { PhoneFormatPipe } from './commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from './commons/pipes/faxno-format-pipe';
import { DateFormatPipe } from './commons/pipes/date-format-pipe';

import { MedicalProviderMasterService } from './account-setup/services/medical-provider-master-service';
import { MedicalProviderMasterStore } from './account-setup/stores/medical-provider-master-store';

// import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
// import { MomentModule } from 'angular2-moment'; 

// v2.0.0
export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  let storedAccessToken: any = window.localStorage.getItem('token');
  c.hubName = 'NotificationHub';
  if (storedAccessToken) {
    let accessToken = storedAccessToken.replace(/"/g, "");
    c.qs = { 'access_token': accessToken, 'application_name': 'Midas' };
    c.url = 'http://caserver:7011';
    c.logging = true;
    return c;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    CommonsModule,
    AppRoutingModule,
    DashboardModule,
    SimpleNotificationsModule,
    EventModule,
    SignalRModule.forRoot(createConfig)
    // MomentModule,
    // NgIdleKeepaliveModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: tokenServiceFactory,
      deps: [SessionStore],
      multi: true
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: configServiceFactory,
    //   deps: [ConfigService],
    //   multi: true
    // },
    ConfigService,
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
    ScannerService,
    DocumentUploadService,
    DoctorsStore,
    DoctorsService,
    ProgressBarService,
    ConfirmationService,
    SpecialityStore,
    SpecialityService,
    UsersService,
    UsersStore,
    LocationsStore,
    LocationsService,
    ScheduleService,
    ScheduleStore,
    NotificationsService,
    PhoneFormatPipe,
    FaxNoFormatPipe,
    DateFormatPipe,
    ValidateDoctorSession,
    ValidateInActiveDoctorSession,
    DiagnosisService,
    DiagnosisStore,
    ProcedureService,
    ProcedureStore,
    MedicalProviderMasterService,
    MedicalProviderMasterStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
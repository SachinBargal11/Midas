import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
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
import { ValidateActiveSession } from './commons/guards/validate-active-session';
import { ValidateInActiveSession } from './commons/guards/validate-inactive-session';
import { StatesStore } from './commons/stores/states-store';
import { StateService } from './commons/services/state-service';
import { PatientManagerModule } from './patient-manager/patient-manager-module';
import { ScannerService } from './commons/services/scanner-service';
import { ConfirmationService } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFormatPipe } from './commons/pipes/date-format-pipe';
import { PhoneFormatPipe } from './commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from './commons/pipes/faxno-format-pipe';
import { DoctorsStore } from './medical-provider/users/stores/doctors-store';
import { DoctorsService } from './medical-provider/users/services/doctors-service';
import { DocumentUploadService } from './commons/services/document-upload-service';
import { ScheduleStore } from './medical-provider/locations/stores/schedule-store';
import { ScheduleService } from './medical-provider/locations/services/schedule-service';

import { SpecialityStore } from './account-setup/stores/speciality-store';
import { SpecialityService } from './account-setup/services/speciality-service';

import { UsersService } from './medical-provider/users/services/users-service';
import { UsersStore } from './medical-provider/users/stores/users-store';

import { UserSettingStore } from './commons/stores/user-setting-store';
import { UserSettingService } from './commons/services/user-setting-service';
import { PushNotificationStore } from './commons/stores/push-notification-store';
import { PushNotificationService } from './commons/services/push-notification-service';

import { LocationsStore } from './medical-provider/locations/stores/locations-store';
import { LocationsService } from './medical-provider/locations/services/locations-service';
import { ProcedureStore } from './commons/stores/procedure-store';
import { ProcedureService } from './commons/services/procedure-service';
import { DiagnosisService } from './commons/services/diagnosis-service';
import { DiagnosisStore } from './commons/stores/diagnosis-store';

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
    PatientManagerModule,
    DashboardModule,
    SimpleNotificationsModule,
    EventModule,
    SignalRModule.forRoot(createConfig)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: tokenServiceFactory,
      deps: [SessionStore],
      multi: true
    },
    ConfigService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ValidateActiveSession,
    ValidateInActiveSession,
    NotificationsService,
    FormBuilder,
    SessionStore,
    AuthenticationService,
    NotificationsStore,
    StateService,
    StatesStore,
    ProgressBarService,
    ScannerService,
    ConfirmationService,
    DateFormatPipe,
    PhoneFormatPipe,
    FaxNoFormatPipe,
    DoctorsStore,
    DoctorsService, DocumentUploadService, ScheduleService,
    ScheduleStore, SpecialityStore,
    SpecialityService,
    UsersService,
    UsersStore,
    LocationsStore,
    LocationsService,
    ProcedureStore,
    ProcedureService,
    DiagnosisService,
    DiagnosisStore,
    UserSettingStore,
    UserSettingService,
    PushNotificationStore,
    PushNotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

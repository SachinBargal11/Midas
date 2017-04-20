import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { NoContentComponent } from './no-content-component';

import { AppRoutingModule } from './app.routes';
import { CommonsModule } from './commons/commons-module';
import { DashboardModule } from './dashboard/dashboard-module';

import { AuthenticationService } from './account/services/authentication-service';
import { SessionStore } from './commons/stores/session-store';
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
    SimpleNotificationsModule
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
    DiagnosisStore
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

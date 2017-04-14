import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content-component';
import { AppRoutingModule } from './app.routes';
import { CommonsModule } from './commons/commons-module';
import { DashboardModule } from './dashboard/dashboard-module';
import { AuthenticationService } from './account/services/authentication-service';
import { SessionStore } from './commons/stores/session-store';
import { NotificationsStore } from './commons/stores/notifications-store';
import { ProgressBarService } from './commons/services/progress-bar-service';
import { ValidateActiveSession } from './commons/guards/validate-active-session';
import { ValidateInActiveSession } from './commons/guards/validate-inactive-session';
import { StatesStore } from './commons/stores/states-store';
import { StateService } from './commons/services/state-service';
import { PatientManagerModule } from './patient-manager/patient-manager-module';
import { AddCompneyConsentComponent} from './patient-manager/consentForm/components/compney-add-consent';
import { ScannerService } from './commons/services/scanner-service';
import { ConfirmationService } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFormatPipe } from './commons/pipes/date-format-pipe';
import { PhoneFormatPipe } from './commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from './commons/pipes/faxno-format-pipe';
import { DoctorsStore } from './medical-provider/users/stores/doctors-store';
import { DoctorsService } from './medical-provider/users/services/doctors-service';
import { DocumentUploadService } from './commons/services/document-upload-service';

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
  ],
  providers: [
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
    DoctorsService, DocumentUploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

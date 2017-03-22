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


@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    CommonsModule,
    AppRoutingModule,
    PatientManagerModule,
    DashboardModule,
    SimpleNotificationsModule
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
    ProgressBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

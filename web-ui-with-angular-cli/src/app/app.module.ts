import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { NoContentComponent } from './no-content-component';

import { RootRoutingModule } from './app.routes';
import { CommonsModule } from './commons/commons-module';
import { DashboardModule } from './dashboard/dashboard-module';

import { AuthenticationService } from './account/services/authentication-service';
import { SessionStore } from './commons/stores/session-store';
import { NotificationsStore } from './commons/stores/notifications-store';
import { ProgressBarService } from './commons/services/progress-bar-service';

import { ValidateActiveSession } from './commons/guards/validate-active-session';
import { ValidateInActiveSession } from './commons/guards/validate-inactive-session';

import { RegistrationService } from './account/services/registration-service';
import { CompanyStore } from './account/stores/company-store';

import { StatesStore } from './commons/stores/states-store';
import { StateService } from './commons/services/state-service';

import { DoctorsStore } from './medical-provider/users/stores/doctors-store';
import { DoctorsService } from './medical-provider/users/services/doctors-service';

import { SpecialityStore } from './account-setup/stores/speciality-store';
import { SpecialityService } from './account-setup/services/speciality-service';

import { UsersService } from './medical-provider/users/services/users-service';
import { UsersStore } from './medical-provider/users/stores/users-store';

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
    RootRoutingModule,
    DashboardModule
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
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LimitPipe } from './pipes/limit-array-pipe';
import { MapToJSPipe } from './pipes/map-to-js';
import { TimeAgoPipe } from './pipes/time-ago-pipe';
import { ReversePipe } from './pipes/reverse-array-pipe';
import { PhoneFormatPipe } from './pipes/phone-format-pipe';
import { FaxNoFormatPipe } from './pipes/faxno-format-pipe';
import { DateFormatPipe } from './pipes/date-format-pipe';

import { AppHeaderComponent } from '../elements/app-header/app-header';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb';
import { MainNavComponent } from './components/main-nav/main-nav';
import { ProgressBarComponent } from './components/progress-bar/progress-bar';
import { LoaderComponent } from './components/loader/loader';
import { NotificationComponent } from './components/notification/notification';
import { ShellComponent } from './shell-component';

import { EmployerService } from '../account/services/employer-service';
import { FamilyMemberService } from '../account/services/family-member-service';
import { PatientsService } from '../account/services/patients-service';
import { InsuranceService } from '../account/services/insurance-service';
import { EmployerStore } from '../account/stores/employer-store';
import { FamilyMemberStore } from '../account/stores/family-member-store';
import { PatientsStore } from '../account/stores/patients-store';
import { InsuranceStore } from '../account/stores/insurance-store';
import { LocationsService } from './services/locations-service';
import { ScheduleService } from './services/schedule-service';
import { LocationsStore } from './stores/locations-store';
import { ScheduleStore } from './stores/schedule-store';
import { UsersService } from './services/users-service';
import { UsersStore } from './stores/users-store';

import {
  AccordionModule,
  InputTextModule,
  ChartModule,
  DataTableModule,
  ButtonModule,
  DialogModule,
  CalendarModule,
  InputMaskModule,
  RadioButtonModule,
  MultiSelectModule,
  ScheduleModule,
  CheckboxModule,
  SharedModule,
  ConfirmDialogModule
} from 'primeng/primeng';
import { DropdownModule } from 'ng2-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    ChartModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    CalendarModule,
    InputMaskModule,
    RadioButtonModule,
    MultiSelectModule,
    ScheduleModule,
    CheckboxModule,
    SharedModule,
    ConfirmDialogModule,
    MultiSelectModule,
    DropdownModule.forRoot()
  ],
  declarations: [
    LimitPipe,
    MapToJSPipe,
    TimeAgoPipe,
    ReversePipe,
    PhoneFormatPipe,
    FaxNoFormatPipe,
    DateFormatPipe,
    AppHeaderComponent,
    BreadcrumbComponent,
    MainNavComponent,
    ProgressBarComponent,
    LoaderComponent,
    NotificationComponent,
    ShellComponent
  ],
  providers: [
    PhoneFormatPipe,
    FaxNoFormatPipe,
    DateFormatPipe,
    EmployerService,
    FamilyMemberService,
    PatientsService,
    InsuranceService,
    EmployerStore,
    FamilyMemberStore,
    PatientsStore,
    InsuranceStore,
    LocationsService,
    ScheduleService,
    LocationsStore,
    ScheduleStore,
    UsersService,
    UsersStore
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LimitPipe,
    MapToJSPipe,
    TimeAgoPipe,
    ReversePipe,
    PhoneFormatPipe,
    FaxNoFormatPipe,
    DateFormatPipe,
    AppHeaderComponent,
    BreadcrumbComponent,
    MainNavComponent,
    ProgressBarComponent,
    LoaderComponent,
    NotificationComponent,
    ReactiveFormsModule,
    InputTextModule,
    ChartModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    CalendarModule,
    InputMaskModule,
    RadioButtonModule,
    MultiSelectModule,
    ScheduleModule,
    CheckboxModule,
    SharedModule,
    ConfirmDialogModule,
    MultiSelectModule,
    DropdownModule,
    ShellComponent
  ]
})
export class CommonsModule { }

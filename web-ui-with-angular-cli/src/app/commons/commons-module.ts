import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LimitPipe } from './pipes/limit-array-pipe';
import { DateFormatPipe } from './pipes/date-format-pipe';
import { MapToJSPipe } from './pipes/map-to-js';
import { TimeAgoPipe } from './pipes/time-ago-pipe';
import { ReversePipe } from './pipes/reverse-array-pipe';
import { DateTimeFormatPipe } from './pipes/date-time-format-pipe';
import { PhoneFormatPipe } from './pipes/phone-format-pipe';
import { FaxNoFormatPipe } from './pipes/faxno-format-pipe';

import { AppHeaderComponent } from '../elements/app-header/app-header';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb';
import { MainNavComponent } from './components/main-nav/main-nav';
import { ProgressBarComponent } from './components/progress-bar/progress-bar';
import { LoaderComponent } from './components/loader/loader';
import { NotificationComponent } from './components/notification/notification';
import { ShellComponent } from './shell-component';
import { ScheduledEventEditorComponent } from '../medical-provider/calendar/components/scheduled-event-editor';
import { LeaveEventEditorComponent } from '../medical-provider/calendar/components/leave-event-editor';
import { DocumentUploadComponent } from '../commons/components/document-upload/document-upload.component';
import { DignosisComponent } from './components/dignosis/dignosis.component';
import { ProcedureComponent } from './components/procedure/procedure.component';
import { ReferralsComponent } from './components/referrals/referrals.component';

import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureFieldComponent } from '../commons/components/signature-field/signature-field.component';

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
  ConfirmDialogModule,
  FileUploadModule,
  GrowlModule,
  TabViewModule,
  LightboxModule,
  ListboxModule

} from 'primeng/primeng';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
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
    ConfirmDialogModule,
    BsDropdownModule.forRoot(),
    FileUploadModule,
    GrowlModule,
    TabViewModule,
    LightboxModule,
    ListboxModule,
    SignaturePadModule
  ],
  declarations: [
    LimitPipe,
    MapToJSPipe,
    DateFormatPipe,
    TimeAgoPipe,
    ReversePipe,
    PhoneFormatPipe,
    FaxNoFormatPipe,
    DateTimeFormatPipe,    
    AppHeaderComponent,
    BreadcrumbComponent,
    MainNavComponent,
    ProgressBarComponent,
    LoaderComponent,
    NotificationComponent,
    ShellComponent,
    ScheduledEventEditorComponent,
    LeaveEventEditorComponent,
    DocumentUploadComponent,
    SignatureFieldComponent,
    DignosisComponent,
    ProcedureComponent,
    ReferralsComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LimitPipe,
    DateFormatPipe,
    MapToJSPipe,
    TimeAgoPipe,
    ReversePipe,
    PhoneFormatPipe,
    DateTimeFormatPipe,
    FaxNoFormatPipe,
    AppHeaderComponent,
    BreadcrumbComponent,
    MainNavComponent,
    ProgressBarComponent,
    LoaderComponent,
    NotificationComponent,
    ReactiveFormsModule,
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
    ConfirmDialogModule,
    BsDropdownModule,
    FileUploadModule,
    GrowlModule,
    TabViewModule,
    LightboxModule,
    ListboxModule,
    ShellComponent,
    ScheduledEventEditorComponent,
    LeaveEventEditorComponent,
    DocumentUploadComponent,
    SignatureFieldComponent,
    DignosisComponent,
    ProcedureComponent,
    ReferralsComponent
  ]
})
export class CommonsModule { }

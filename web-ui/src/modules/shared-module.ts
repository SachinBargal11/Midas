import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LimitPipe } from '../pipes/limit-array-pipe';
import { MapToJSPipe } from '../pipes/map-to-js';
import { TimeAgoPipe } from '../pipes/time-ago-pipe';
import { ReversePipe } from '../pipes/reverse-array-pipe';
import { PhoneFormatPipe } from '../pipes/phone-format-pipe';

import { AppHeaderComponent } from '../components/elements/app-header';
import { BreadcrumbComponent } from '../components/elements/breadcrumb';
import { MainNavComponent } from '../components/elements/main-nav';
import { ProgressBarComponent } from '../components/elements/progress-bar';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LoaderComponent } from '../components/elements/loader';
import { NotificationComponent } from '../components/elements/notification';
import { InputTextModule, ChartModule, DataTableModule, ButtonModule, DialogModule, CalendarModule, InputMaskModule, RadioButtonModule, MultiSelectModule } from 'primeng/primeng';
import { DropdownModule } from 'ng2-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SimpleNotificationsModule,
    InputTextModule, ChartModule, DataTableModule, ButtonModule, DialogModule, CalendarModule, InputMaskModule, RadioButtonModule, MultiSelectModule, DropdownModule
  ],
  declarations: [
    LimitPipe,
    MapToJSPipe,
    TimeAgoPipe,
    ReversePipe,
    PhoneFormatPipe,
    AppHeaderComponent,
    BreadcrumbComponent,
    MainNavComponent,
    ProgressBarComponent,
    LoaderComponent,
    NotificationComponent
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
    AppHeaderComponent,
    BreadcrumbComponent,
    MainNavComponent,
    ProgressBarComponent,
    SimpleNotificationsModule,
    LoaderComponent,
    NotificationComponent,
    ReactiveFormsModule,
    InputTextModule, ChartModule, DataTableModule, ButtonModule, DialogModule, CalendarModule, InputMaskModule, RadioButtonModule, MultiSelectModule, DropdownModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LimitPipe } from './pipes/limit-array-pipe';
import { MapToJSPipe } from './pipes/map-to-js';
import { TimeAgoPipe } from './pipes/time-ago-pipe';
import { ReversePipe } from './pipes/reverse-array-pipe';
import { PhoneFormatPipe } from './pipes/phone-format-pipe';

import { AppHeaderComponent } from '../elements/app-header/app-header';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb';
import { MainNavComponent } from './components/main-nav/main-nav';
import { ProgressBarComponent } from './components/progress-bar/progress-bar';
import { LoaderComponent } from './components/loader/loader';
import { NotificationComponent } from './components/notification/notification';
import { ShellComponent } from './shell-component';

import {
  InputTextModule,
  ChartModule,
  DataTableModule,
  ButtonModule,
  DialogModule,
  CalendarModule,
  InputMaskModule,
  RadioButtonModule,
  MultiSelectModule
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
    DropdownModule.forRoot()
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
    NotificationComponent,
    ShellComponent
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
    DropdownModule,
    ShellComponent
  ]
})
export class CommonsModule { }

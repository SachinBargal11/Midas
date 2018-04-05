import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../../commons/commons-module';
import { AddUserComponent } from './components/add-user';
import { BillingComponent } from './components/Billing';
import { DoctorSpecificInformationComponent } from './components/doctor-specific-information';
import { LocationsComponent } from './components/locations';
import { UpdateUserComponent } from './components/update-user';
import { UserAccessComponent } from './components/user-access';
import { UserBasicComponent } from './components/user-basic';
import { UserStatisticsComponent } from './components/user-statistics';
import { UsersListComponent } from './components/users-list';
import { UserShellComponent } from './components/users-shell';
import { DoctorLocationScheduleComponent } from './components/doctor-location-schedule';
import { UserLocationScheduleComponent } from './components/user-location-schedule';
import { DoctorLocationScheduleShellComponent } from './components/doctor-location-schedule-shell';
import { UserLocationScheduleShellComponent } from './components/user-location-schedule-shell';
import { AddDoctorLocationComponent } from './components/add-doctor-location';
import { AddUserLocationComponent } from './components/add-user-location';
import { AddDoctorLocationSpecialityComponent } from './components/add-doctor-location-speciality';

import { DoctorLocationScheduleService } from './services/doctor-location-schedule-service';
import { DoctorLocationScheduleStore } from './stores/doctor-location-schedule-store';
import { DoctorLocationsService } from './services/doctor-locations-service';
import { DoctorLocationsStore } from './stores/doctor-locations-store';
import { DoctorLocationSpecialityService } from './services/doctor-location-speciality-service';
import { DoctorLocationSpecialityStore } from './stores/doctor-location-speciality-store';
import { UserLocationScheduleService } from './services/user-location-schedule-service';
import { UserLocationScheduleStore } from './stores/user-location-schedule-store';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CommonsModule
  ],
  declarations: [
    AddUserComponent,
    BillingComponent,
    DoctorSpecificInformationComponent,
    LocationsComponent,
    UpdateUserComponent,
    UserAccessComponent,
    UserBasicComponent,
    UserStatisticsComponent,
    UsersListComponent,
    UserShellComponent,
    DoctorLocationScheduleShellComponent,
    UserLocationScheduleShellComponent,
    DoctorLocationScheduleComponent,
    UserLocationScheduleComponent,
    AddDoctorLocationComponent,
    AddUserLocationComponent,
    AddDoctorLocationSpecialityComponent
  ],
  providers: [
    DoctorLocationScheduleService,
    DoctorLocationScheduleStore,
    DoctorLocationsService,
    DoctorLocationsStore,
    DoctorLocationSpecialityService,
    DoctorLocationSpecialityStore,
    UserLocationScheduleService,
    UserLocationScheduleStore
  ]
})
export class UsersModule { }

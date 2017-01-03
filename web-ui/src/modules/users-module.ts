import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared-module';
import { AddUserComponent } from '../components/pages/users/add-user';
import { BillingComponent } from '../components/pages/users/Billing';
import { CalendarComponent } from '../components/pages/users/calendar';
import { DoctorSpecificInformationComponent } from '../components/pages/users/doctor-specific-information';
import { LocationsComponent } from '../components/pages/users/locations';
import { ReportsComponent } from '../components/pages/users/reports';
import { UpdateUserComponent } from '../components/pages/users/update-user';
import { UserAccessComponent } from '../components/pages/users/user-access';
import { UserBasicComponent } from '../components/pages/users/user-basic';
import { UserStatisticsComponent } from '../components/pages/users/user-statistics';
import { UsersListComponent } from '../components/pages/users/users-list';
import { UserShellComponent } from '../components/pages/users/users-shell';
import { UsersService } from '../services/users-service';
import { UsersStore } from '../stores/users-store';
@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  declarations: [
    AddUserComponent,
    BillingComponent,
    CalendarComponent,
    DoctorSpecificInformationComponent,
    LocationsComponent,
    ReportsComponent,
    UpdateUserComponent,
    UserAccessComponent,
    UserBasicComponent,
    UserStatisticsComponent,
    UsersListComponent,
    UserShellComponent
  ],
  providers: [UsersService, UsersStore]
})
export class UsersModule { }

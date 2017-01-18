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
    UserShellComponent
  ],
  providers: []
})
export class UsersModule { }

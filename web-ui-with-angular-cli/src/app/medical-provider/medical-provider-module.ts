import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons-module';
import { LocationModule } from './locations/location-module';
import { UsersModule } from './users/users-module';
import { RoomsModule } from './rooms/rooms-module';
import { CalendarModule } from './calendar/calendar-module';
import { ReportsModule } from './reports/reports-module';
import { MedicalProviderNavComponent } from './medical-provider-nav-bar';
import { MedicalProviderShellComponent } from './medical-provider-shell';
import { MedicalProviderService } from './locations/services/medical-provider-service';
import { MedicalProviderRoutingModule } from './medical-provider-routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CommonsModule,
    LocationModule,
    UsersModule,
    RoomsModule,
    CalendarModule,
    ReportsModule,
    MedicalProviderRoutingModule
  ],
  declarations: [
    MedicalProviderNavComponent,
    MedicalProviderShellComponent
  ],
  providers: [
    MedicalProviderService
  ]
})
export class MedicalProviderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../../commons/commons-module';
import { DoctorShellComponent } from './components/doctor-shell';
import { AssignDoctorComponent } from './components/assign-doctor';
// import { EditRoomComponent } from './components/edit-room';
import { DoctorsListComponent } from './components/doctors-list';
import { DoctorScheduleComponent } from './components/doctor-schedule';
import { AddLocationDoctorSpecialityComponent } from './components/add-location-doctor-speciality';
import { ScheduleService } from '../locations/services/schedule-service';
import { ScheduleStore } from '../locations/stores/schedule-store';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonsModule
    ],
    declarations: [
        DoctorShellComponent,
        DoctorsListComponent,
        AssignDoctorComponent,
        DoctorScheduleComponent,
        AddLocationDoctorSpecialityComponent

       
    ],
    providers: [
        ScheduleService,
        ScheduleStore

    ]
})
export class DoctorModule { }

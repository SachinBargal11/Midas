import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared-module';
import { AddDoctorComponent } from '../components/pages/doctors/add-doctor';
import { DoctorSpecialityComponent } from '../components/pages/doctors/doctor-speciality';
import { DoctorsListComponent } from '../components/pages/doctors/doctors-list';
import { DoctorsStatisticsComponent } from '../components/pages/doctors/doctors-statistics';
import { UpdateDoctorComponent } from '../components/pages/doctors/update-doctor';
import { DoctorsService } from '../services/doctors-service';
import { DoctorsStore } from '../stores/doctors-store';
@NgModule({
    imports: [CommonModule, RouterModule, SharedModule],
    declarations: [
        AddDoctorComponent,
        DoctorSpecialityComponent,
        DoctorsListComponent,
        DoctorsStatisticsComponent,
        UpdateDoctorComponent
    ],
    providers: [
        DoctorsService,
        DoctorsStore
    ]
})
export class DoctorsModule { }

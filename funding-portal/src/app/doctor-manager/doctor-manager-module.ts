import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonsModule } from '../commons/commons-module';
import { DoctorAppointmentComponent } from './components/doctor-appointment';
import { DoctorManagerRoutingModule } from './doctor-manager-module-routes';
import { PatientVisitsStore } from '../patient-manager/patient-visit/stores/patient-visit-store';
import { PatientVisitService } from '../patient-manager/patient-visit/services/patient-visit-service';
import { PatientsStore } from '../patient-manager/patients/stores/patients-store';
import { PatientsService } from '../patient-manager/patients/services/patients-service';
// import { PatientNavComponent } from '../patient-manager/patients/components/patient-nav-bar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonsModule,
        DoctorManagerRoutingModule
    ],
    declarations: [
        DoctorAppointmentComponent
    ],
    providers: [
        PatientVisitService,
        PatientsService,
        PatientVisitsStore,
        PatientsStore
    ]
})
export class DoctorManagerModule {
}

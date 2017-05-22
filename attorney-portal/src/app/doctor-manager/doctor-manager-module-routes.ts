import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorAppointmentComponent } from './components/doctor-appointment';
import { ValidateActiveSession } from '../commons/guards/validate-active-session';

export const doctorManagerRoutes: Routes = [
    {
        path: 'doctor-appointment',
        component: DoctorAppointmentComponent,
        canActivate: [ValidateActiveSession],
        data: {
          breadcrumb: 'Doctor Appointment'
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(doctorManagerRoutes)],
    exports: [RouterModule]
})
export class DoctorManagerRoutingModule { }

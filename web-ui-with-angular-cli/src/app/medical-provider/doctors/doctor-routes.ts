import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { DoctorsListComponent } from './components/doctors-list';
import { AssignDoctorComponent } from './components/assign-doctor';
import { DoctorShellComponent } from './components/doctor-shell';
import { DoctorScheduleComponent } from './components/doctor-schedule';
import { AddLocationDoctorSpecialityComponent } from './components/add-location-doctor-speciality';
import { ShellComponent } from '../../commons/shell-component';

export const DoctorsRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'doctors'
    },
    // {
    //     path: 'rooms',
    //     component: RoomsComponent,
    //     canActivate: [ValidateActiveSession],
    //     data: {
    //         breadcrumb: 'Rooms'
    //     }
    // },
    {
        path: 'doctors',
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Doctors'
        },
        children: [
            {
                path: '',
                component: DoctorsListComponent,
                data: {
                    breadcrumb: 'root'
                }
            },
            {
                path: 'add',
                component: AssignDoctorComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Doctor'
                }
            },
            {
                path: ':scheduleId',
                component: DoctorShellComponent,
                data: {
                    breadcrumb: 'root'
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'schedule',
                        pathMatch: 'full'
                    },
                    
                    {
                        path: 'schedule',
                        component: DoctorScheduleComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Doctor Schedule'
                        }
                    },
                    {
                        path: 'add-speciality',
                        component: AddLocationDoctorSpecialityComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Add Speciality'
                        }
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(DoctorsRoutes)],
    exports: [RouterModule]
})
export class DoctorsRoutingModule { }
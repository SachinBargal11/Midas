import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { UsersListComponent } from './components/users-list';
import { UserShellComponent } from './components/users-shell';
import { UserBasicComponent } from './components/user-basic';
import { UserAccessComponent } from './components/user-access';
import { DoctorSpecificInformationComponent } from './components/doctor-specific-information';
import { AddUserComponent } from './components/add-user';
import { UpdateUserComponent } from './components/update-user';
import { LocationsComponent } from './components/locations';
import { BillingComponent } from './components/Billing';
import { DoctorLocationScheduleShellComponent } from './components/doctor-location-schedule-shell';
import { DoctorLocationScheduleComponent } from './components/doctor-location-schedule';
import { AddDoctorLocationComponent } from './components/add-doctor-location';
import { AddDoctorLocationSpecialityComponent } from './components/add-doctor-location-speciality';
import { ShellComponent } from '../../commons/shell-component';

export const UsersRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
    },
    {
        path: 'users',
        component: ShellComponent,
        data: {
            breadcrumb: 'Users'
        },
        children: [
            {
                path: '',
                component: UsersListComponent,
                data: {
                    breadcrumb: 'root'
                }
            },
            {
                path: 'add',
                component: AddUserComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add User'
                }
            },
            {
                path: 'edit/:id',
                component: UpdateUserComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Edit User'
                }
            },
            {
                path: ':userId/:userRoleFlag',
                component: UserShellComponent,
                data: {
                    breadcrumb: 'root'
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'basic',
                        pathMatch: 'full'
                    },
                    {
                        path: 'basic',
                        component: UserBasicComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Basic'
                        }
                    },
                    {
                        path: 'access',
                        component: UserAccessComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Access'
                        }
                    },
                    {
                        path: 'doctorSpecificInformation',
                        component: DoctorSpecificInformationComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: "Doctor's Information"
                        }
                    },
                    {
                        path: 'locations',
                        component: ShellComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Locations'
                        },
                        children: [
                            {
                                path: '',
                                component: LocationsComponent,
                                data: {
                                    breadcrumb: 'root'
                                }
                            },
                            {
                                path: 'add',
                                component: AddDoctorLocationComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Add Location'
                                }
                            },
                            {
                                path: ':scheduleId',
                                component: DoctorLocationScheduleShellComponent,
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
                                        component: DoctorLocationScheduleComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'Schedule'
                                        }
                                    },
                                    {
                                        path: 'assign-speciality',
                                        component: AddDoctorLocationSpecialityComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'Assign Speciality'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'billing',
                        component: BillingComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Billing'
                        }
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(UsersRoutes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
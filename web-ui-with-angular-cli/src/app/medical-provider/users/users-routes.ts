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
                path: ':userId',
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
                        component: LocationsComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Locations'
                        }
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
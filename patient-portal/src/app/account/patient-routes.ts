import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsShellComponent } from './components/patients-shell';
import { PatientBasicComponent } from './components/patient-basic';
import { DemographicsComponent } from './components/demographics';
import { ValidateActiveSession } from '../commons/guards/validate-active-session';
import { ShellComponent } from '../commons/shell-component';
import { FamilyMemberListComponent } from './components/family-member-list';
import { AddFamilyMemberComponent } from './components/add-family-member';
import { EditFamilyMemberComponent } from './components/edit-family-member';
//import { PatientEmployerComponent } from './components/employer';

export const PatientsShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'basic'
    },
    {
        path: '',
        component: PatientsShellComponent,
        data: {
            breadcrumb: 'root'
        },
        children: [
            {
                path: 'basic',
                component: PatientBasicComponent,
                data: {
                    breadcrumb: 'Basic'
                }
            },
            {
                path: 'demographics',
                component: DemographicsComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Demo Graphics'
                }
            },
            {
                path: 'family-members',
                component: ShellComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Family Members'
                },
                children: [
                    {
                        path: '',
                        component: FamilyMemberListComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'root'
                        }
                    },
                    {
                        path: 'add',
                        component: AddFamilyMemberComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Add Family Member'
                        }
                    },
                    {
                        path: 'edit/:id',
                        component: EditFamilyMemberComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Edit Family Member'
                        }
                    }
                ]
            }
            // {
            //     path: 'employer',
            //     component: PatientEmployerComponent,
            //     canActivate: [ValidateActiveSession],
            //     data: {
            //         breadcrumb: 'Employer'
            //     }
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(PatientsShellRoutes)],
    exports: [RouterModule]
})
export class PatientsRoutingModule { }

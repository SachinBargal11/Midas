import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsListComponent } from './components/patients-list';
import { AddPatientComponent } from './components/add-patient';
import { PatientsShellComponent } from './components/patients-shell';
import { PatientBasicComponent } from './components/patient-basic';
import { DemographicsComponent } from './components/demographics';
// import { BalancesComponent } from './components/balances';
import { DocumentsComponent } from './components/documents';
// import { AppointmentsComponent } from './components/appointments';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { ShellComponent } from '../../commons/shell-component';
import { AddFamilyMemberComponent } from './components/add-family-member';
import { FamilyMemberListComponent } from './components/family-member-list';
import { EditFamilyMemberComponent } from './components/edit-family-member';
// import { AttorneyComponent } from './components/attorney';
//import { PatientEmployerComponent } from './components/employer';
import { InsuranceListComponent } from './components/insurance-list';
import { AddInsuranceComponent } from './components/add-insurance';
import { EditInsuranceComponent } from './components/edit-insurance';
import { ViewAllComponent } from './components/view-all';

export const PatientsShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'patient'
    },
    {
        path: 'patient',
        component: PatientsShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Patient'
        },
        children: [
            {
                path: '',
                redirectTo: 'viewall',
                pathMatch: 'full'
            },
            {
                path: 'viewall',
                component: ViewAllComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'View All'
                }
            },
            {
                path: 'basic',
                component: PatientBasicComponent,
                canActivate: [ValidateActiveSession],
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
                path: 'insurances',
                component: ShellComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Insurances'
                },
                children: [
                    {
                        path: '',
                        component: InsuranceListComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'root'
                        }
                    },
                    {
                        path: 'add',
                        component: AddInsuranceComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Add Insurance'
                        }
                    },
                    {
                        path: 'edit/:id',
                        component: EditInsuranceComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Edit Insurance'
                        }
                    }
                ]
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
            },
            {
                path: 'documents',
                component: DocumentsComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Documents'
                }
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

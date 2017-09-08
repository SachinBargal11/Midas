import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../commons/guards/validate-active-session';
import { PatientsManagerShellComponent } from './patients-manager-shell';
import { PatientsShellRoutes } from './patients/patient-routes';
import { CasesShellRoutes } from './cases/cases-routes';
// import { ReferalsShellRoutes } from './referals/referals-routes';
// import { ConsentFormsShellRoutes } from './consent-forms/consent-forms-routes';
import { PatientVisitRoutes } from './patient-visit/patient-visit-routes';
import { PatientsListComponent } from './patients/components/patients-list';
import { AddPatientComponent } from './patients/components/add-patient';
import { PatientsShellComponent } from './patients/components/patients-shell';
import { PatientBasicComponent } from './patients/components/patient-basic';
import { DemographicsComponent } from './patients/components/demographics';
// import { BalancesComponent } from './components/balances';
import { DocumentsComponent } from './patients/components/documents';
// import { AppointmentsComponent } from './components/appointments';
import { ShellComponent } from '../commons/shell-component';
import { AddFamilyMemberComponent } from './cases/components/add-family-member';
import { FamilyMemberListComponent } from './cases/components/family-member-list';
import { EditFamilyMemberComponent } from './cases/components/edit-family-member';
// import { AttorneyComponent } from './components/attorney';
//import { PatientEmployerComponent } from './patients/components/employer';
import { InsuranceListComponent } from './cases/components/insurance-list';
import { AddInsuranceComponent } from './cases/components/add-insurance';
import { EditInsuranceComponent } from './cases/components/edit-insurance';
import { ViewAllComponent } from './patients/components/view-all';
import { ConsentShellRoutes } from './consentForm/consent-routes';

let PatientManagerRoutes: Routes = [
    {
        path: '',
        component: PatientsManagerShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'profile'
            },
            {
                path: 'profile',
                component: PatientsShellComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Profile'
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
            },
            // ...PatientsShellRoutes,
            ...CasesShellRoutes
            , ...ConsentShellRoutes
            , ...PatientVisitRoutes
        ],
        data: {
            breadcrumb: 'Patient Manager'
        }
    },
];


@NgModule({
    imports: [RouterModule.forChild(PatientManagerRoutes)],
    exports: [RouterModule]
})
export class PatientRoutingModule { }
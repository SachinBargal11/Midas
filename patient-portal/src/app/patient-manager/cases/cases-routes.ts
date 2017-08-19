import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { AddCaseComponent } from './components/add-case';
import { CasesListComponent } from './components/cases-list';
import { ShellComponent } from '../../commons/shell-component';
import { CaseShellComponent } from './components/cases-shell';
import { CaseBasicComponent } from './components/case-basic';
import { PatientVisitListComponent } from './components/patient-visits-list';
import { PatientVisitListShellComponent } from './components/patient-visit-list-shell';
import { VisitDocumentsUploadComponent } from './components/visit-document';
import { PatientVisitNotesComponent } from './components/patient-visit-notes';
import { EditReferringOfficeComponent } from './components/edit-referring-office';
import { AccidentInfoComponent } from './components/accident';
import { CaseDocumentsUploadComponent } from './components/case-documents';
import { InsuranceMappingComponent } from './components/insurance-mapping';
import { AssignInsuranceComponent } from './components/assign-insurance';
import { CompanyCasesComponent } from './components/company-cases-list';
import { ConsentListComponent } from './components/list-consent';
import { AddConsentComponent } from './components/add-consent';
import { EditConsentComponent } from './components/edit-consent';
//import { PopupFileUpload } from '../../commons/components/PopupFileUpload';
import { VisitShellComponent } from './components/visit-shell';
import { PatientVisitListDoctorComponent } from './components/doctor-visit';
import { PatientVisitListTreatingRoomComponent } from './components/treatingroom-visit';
import { CaseEmployerComponent } from './components/employer';
export const CasesShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cases'
    },
    {
        path: 'cases',
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Cases'
        },
        children: [
            {
                path: '',
                component: CasesListComponent,
                data: {
                    breadcrumb: 'root'
                }
            },
            {
                path: ':caseId',
                component: CaseShellComponent,
                canActivate: [ValidateActiveSession],
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
                        component: CaseBasicComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Basic'
                        }
                    },


                    {
                        path: 'patient-visit',
                        component: VisitShellComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Visits'
                        },
                        children: [
                            {
                                path: '',
                                redirectTo: 'doctor-visit',
                                pathMatch: 'full'
                            },
                            {
                                path: 'doctor-visit',
                                component: ShellComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Doctor Visits'
                                },
                                children: [
                                    {
                                        path: '',
                                        component: PatientVisitListDoctorComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'root'
                                        }
                                    },
                                    {
                                        path: ':visitId',
                                        component: PatientVisitListShellComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'root'
                                        },
                                        children: [
                                            {
                                                path: '',
                                                redirectTo: 'visit-note',
                                                pathMatch: 'full'
                                            },
                                            {
                                                path: 'visit-note',
                                                component: PatientVisitNotesComponent,
                                                canActivate: [ValidateActiveSession],
                                                data: {
                                                    breadcrumb: 'Visit Notes'
                                                }
                                            },
                                            {
                                                path: 'visit-document',
                                                component: VisitDocumentsUploadComponent,
                                                canActivate: [ValidateActiveSession],
                                                data: {
                                                    breadcrumb: 'Documents Upload'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                path: 'treatingroom-visit',
                                component: ShellComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Treating Room Visits'
                                },
                                children: [
                                    {
                                        path: '',
                                        component: PatientVisitListTreatingRoomComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'root'
                                        },


                                    },
                                    {
                                        path: ':visitId',
                                        component: PatientVisitListShellComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'root'
                                        },
                                        children: [
                                            {
                                                path: '',
                                                redirectTo: 'visit-note',
                                                pathMatch: 'full'
                                            },
                                            {
                                                path: 'visit-note',
                                                component: PatientVisitNotesComponent,
                                                canActivate: [ValidateActiveSession],
                                                data: {
                                                    breadcrumb: 'Visit Notes'
                                                }
                                            },
                                            {
                                                path: 'visit-document',
                                                component: VisitDocumentsUploadComponent,
                                                canActivate: [ValidateActiveSession],
                                                data: {
                                                    breadcrumb: 'Documents Upload'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                path: ':visitId',
                                component: PatientVisitListShellComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'root'
                                },
                                children: [
                                    {
                                        path: '',
                                        redirectTo: 'visit-note',
                                        pathMatch: 'full'
                                    },
                                    {
                                        path: 'visit-note',
                                        component: PatientVisitNotesComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'Visit Notes'
                                        }
                                    },
                                    {
                                        path: 'visit-document',
                                        component: VisitDocumentsUploadComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'Documents Upload'
                                        }
                                    }
                                ]
                            }
                            // {
                            //     path: 'edit/:id',
                            //     component: PatientVisitNotesComponent,
                            //     canActivate: [ValidateActiveSession],
                            //     data: {
                            //         breadcrumb: 'Visit Notes'
                            //     }
                            // }
                        ]
                    },

                    {
                        path: 'accident',
                        component: AccidentInfoComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Accident'
                        }
                    },
                    {
                        path: 'insurance-mapping',
                        component: ShellComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Insurance'
                        },

                        children: [
                            {
                                path: '',
                                component: InsuranceMappingComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'root'
                                },
                            },
                            {
                                path: 'assign',
                                component: AssignInsuranceComponent,
                                data: {
                                    breadcrumb: 'Assign Insurance'
                                }
                            },
                        ]
                    },
                    {
                        path: 'documents',
                        component: CaseDocumentsUploadComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Documents'
                        }
                    },
                    {
                        path: 'consent',
                        component: ShellComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Consent'
                        },
                        children: [
                            {
                                path: '',
                                component: AddConsentComponent,
                                data: {
                                    breadcrumb: 'root'
                                }
                            }
                            // {
                            //     path: 'add',
                            //     component: AddConsentComponent,
                            //     canActivate: [ValidateActiveSession],
                            //     data: {
                            //         breadcrumb: 'Add Consent'
                            //     }
                            // }

                        ]
                    },
                    {
                        path: 'employer',
                        component: CaseEmployerComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Employer'
                        }
                    }
                ]
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(CasesShellRoutes)],
    exports: [RouterModule]
})
export class CasesShellRoutingModule { }

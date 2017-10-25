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
import { AddFamilyMemberComponent } from './components/add-family-member';
import { FamilyMemberListComponent } from './components/family-member-list';
import { EditFamilyMemberComponent } from './components/edit-family-member';
import { InsuranceListComponent } from './components/insurance-list';
import { AddInsuranceComponent } from './components/add-insurance';
import { EditInsuranceComponent } from './components/edit-insurance';
import { PriorAccidentComponent } from './components/prior-accident';
import { AutoInformationInfoComponent } from './components/auto-Information';
import { ClientVisitListComponent } from './components/client-visit';

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
                                redirectTo: 'client-visit',
                                pathMatch: 'full'
                            },
                            {
                                path: 'client-visit',
                                component: ShellComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Client Visits'
                                },
                                children: [
                                    {
                                        path: '',
                                        component: ClientVisitListComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'root'
                                        }
                                    }
                                ]
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
                        path: 'prior-accident',
                        component: PriorAccidentComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Prior Accident'
                        }
                    },
                    {
                        path: 'accident',
                        component: AccidentInfoComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Accident'
                        }
                    },
                    // {
                    //     path: 'insurance-mapping',
                    //     component: ShellComponent,
                    //     canActivate: [ValidateActiveSession],
                    //     data: {
                    //         breadcrumb: 'Insurance'
                    //     },

                    //     children: [
                    //         {
                    //             path: '',
                    //             component: InsuranceMappingComponent,
                    //             canActivate: [ValidateActiveSession],
                    //             data: {
                    //                 breadcrumb: 'root'
                    //             },
                    //         },
                    //         {
                    //             path: 'assign',
                    //             component: AssignInsuranceComponent,
                    //             data: {
                    //                 breadcrumb: 'Assign Insurance'
                    //             }
                    //         },
                    //     ]
                    // },
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
                        path: 'autoInformation',
                        component: AutoInformationInfoComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'AutoInformation'
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

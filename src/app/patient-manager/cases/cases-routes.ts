import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { AddCaseComponent } from './components/add-case';
import { CasesListComponent } from './components/cases-list';
import { ShellComponent } from '../../commons/shell-component';
import { CaseShellComponent } from './components/cases-shell';
import { CaseBasicComponent } from './components/case-basic';
import { CaseBasicLabelComponent } from './components/case-basic-label';
import { ReferringOfficeListComponent } from './components/referring-office-list';
import { PatientVisitListComponent } from './components/patient-visits-list';
import { PatientVisitListShellComponent } from './components/patient-visit-list-shell';
import { VisitDocumentsUploadComponent } from './components/visit-document';
import { PatientVisitNotesComponent } from './components/patient-visit-notes';
import { AddReferringOfficeComponent } from './components/add-referring-office';
import { EditReferringOfficeComponent } from './components/edit-referring-office';
import { AccidentInfoComponent } from './components/accident';
import { CaseDocumentsUploadComponent } from './components/case-documents';
// import { InsuranceMappingComponent } from './components/insurance-mapping';
// import { AssignInsuranceComponent } from './components/assign-insurance';
import { CompanyCasesComponent } from './components/company-cases-list';
import { ConsentListComponent } from './components/list-consent';
import { AddConsentComponent } from './components/add-consent';
import { EditConsentComponent } from './components/edit-consent';
import { ReferralListComponent } from './components/referral-list';
import { AddReferralComponent } from './components/add-referral';
import { VisitShellComponent } from './components/visit-shell';
import { PatientVisitListDoctorComponent } from './components/doctor-visit';
import { PatientVisitListTreatingRoomComponent } from './components/treatingroom-visit';
import { PatientVisitListImeComponent } from './components/ime-visit';
//import { PopupFileUpload } from '../../commons/components/PopupFileUpload';
import { BillingInfoComponent } from './components/billing';
import { PaymentListComponent } from './components/payment-list';
import { InsuranceListComponent } from './components/insurance-list';
import { CaseEmployerComponent } from './components/employer';
import { AddInsuranceComponent } from './components/add-insurance';
import { EditInsuranceComponent } from './components/edit-insurance';
import { AddFamilyMemberComponent } from './components/add-family-member';
import { FamilyMemberListComponent } from './components/family-member-list';
import { EditFamilyMemberComponent } from './components/edit-family-member';

import { AutoInformationInfoComponent } from './components/auto-Information';
import { PriorAccidentComponent } from './components/prior-accident';

import { CaseMergedDocumentsComponent } from './components/case-merged-documents';
import { CaseDocumentPacketingComponent } from './components/case-document-packeting';

import { CaseDocumentShellComponent }from './components/case-documents-shell';

export const CasesShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cases'
    },
    {
        path: 'cases',
        component: CompanyCasesComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Cases'
        }
    },
    {
        path: 'cases',
        component: ShellComponent,
        data: {
            breadcrumb: 'Cases'
        },
        children: [
            {
                path: 'add',
                component: AddCaseComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Case'
                }
            },
            // {
            //     path: 'upload-consent/:caseId',
            //     // component: PopupFileUpload
            // }
        ]
    },
    {
        path: 'cases/:patientId',
        component: ShellComponent,
        data: {
            breadcrumb: 'Cases'
        },
        children: [
            {
                path: '',
                component: CasesListComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'root'
                }
            },
            {
                path: 'add',
                component: AddCaseComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Case'
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
                    // {
                    //     path: 'basicLabel',
                    //     component: CaseBasicLabelComponent,
                    //     canActivate: [ValidateActiveSession],
                    //     data: {
                    //         breadcrumb: 'Basic'
                    //     }
                    // },
                    {
                        path: 'referring-offices',
                        component: ShellComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Referring Officies'
                        },
                        children: [
                            {
                                path: '',
                                component: ReferringOfficeListComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'root'
                                }
                            },
                            {
                                path: 'add',
                                component: AddReferringOfficeComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Add Referring Office'
                                }
                            },
                            {
                                path: 'edit/:id',
                                component: EditReferringOfficeComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Edit Referring Office'
                                }
                            }
                        ]
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
                                path: 'ime-visit',
                                component: ShellComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'IME Visits'
                                },
                                children: [
                                    {
                                        path: '',
                                        component: PatientVisitListImeComponent,
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
                    {
                        path: 'billings',
                        component: BillingInfoComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Billings'
                        }
                    },
                    {
                        path: 'payment',
                        component: PaymentListComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Payment'
                        }
                    },
                    // {
                    //     path: 'documents',
                    //     component: CaseDocumentsUploadComponent,
                    //     canActivate: [ValidateActiveSession],
                    //     data: {
                    //         breadcrumb: 'Documents'
                    //     }
                    // },
                    // {
                    //     path: 'case-merged-documents',
                    //     component: CaseMergedDocumentsComponent,
                    //     canActivate: [ValidateActiveSession],
                    //     data: {
                    //         breadcrumb: 'Merged Documents'
                    //     }
                    // },
                    // {
                    //     path: 'case-document-packeting',
                    //     component: CaseDocumentPacketingComponent,
                    //     canActivate: [ValidateActiveSession],
                    //     data: {
                    //         breadcrumb: 'Packeted Documents'
                    //     }
                    // },
                    {
                        path: 'case-documents',
                        component: CaseDocumentShellComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Documents'
                        },
                        children: [
                            {
                                path: '',
                                redirectTo: 'case-documents',
                                pathMatch: 'full'
                            },
                            {
                                path: 'case-documents',
                                component: ShellComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'case-documents'
                                },
                                children: [
                                    {
                                        path: '',
                                        component: CaseDocumentsUploadComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'root'
                                        }
                                    },
                                ]
                            },
                            {
                                path: 'case-merged-documents',
                                component: ShellComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Merged Documents'
                                },
                                children: [
                                    {
                                        path: '',
                                        component: CaseMergedDocumentsComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'root'
                                        },


                                    },
                                ]
                            },
                            {
                                path: 'case-document-packeting',
                                component: ShellComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Packeted Documents'
                                },
                                children: [
                                    {
                                        path: '',
                                        component: CaseDocumentPacketingComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'root'
                                        },


                                    },
                                ]
                            },
                        ]
                    },
                    // {
                    //     path: 'insurances',
                    //     component: InsuranceListComponent,
                    //     canActivate: [ValidateActiveSession],
                    //     data: {
                    //         breadcrumb: 'Insurances'
                    //     }
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
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'root'
                                }
                            }
                        ]
                    },
                    {
                        path: 'referrals',
                        component: ShellComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Referrals'
                        },
                        children: [
                            {
                                path: '',
                                component: ReferralListComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'root'
                                }
                            },
                            {
                                path: 'add',
                                component: AddReferralComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Add Referral'
                                }
                            }
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
                    },
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

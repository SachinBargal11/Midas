import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../commons/guards/validate-active-session';
import { PatientsManagerShellComponent } from './patients-manager-shell';
import { PatientsShellRoutes } from './patients/patient-routes';
import { CasesShellRoutes } from './cases/cases-routes';
import { ReferalsShellRoutes } from './referals/referals-routes';
import { ConsentFormsShellRoutes } from './consent-forms/consent-forms-routes';
import { CaseManagerRoutes } from './case-manager/cases-manager-routes';

let PatientManagerRoutes: Routes = [
    {
        path: '',
        component: PatientsManagerShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            ...PatientsShellRoutes,
            ...CasesShellRoutes,
            ...ReferalsShellRoutes,
            ...ConsentFormsShellRoutes,
            ...CaseManagerRoutes
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
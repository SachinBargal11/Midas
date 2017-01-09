import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { PatientsManagerShellComponent } from '../components/pages/patients/patients-manager-shell';
import { PatientsShellRoutes } from './patient-routes';
import { CasesShellRoutes } from './cases-routes';
import { ReferalsShellRoutes } from './referals-routes';
import { ConsentFormsShellRoutes } from './consent-forms-routes';

let PatientManagerRoutes: Routes = [
    {
        path: 'patient-manager',
        component: PatientsManagerShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            ...PatientsShellRoutes,
            ...CasesShellRoutes,
            ...ReferalsShellRoutes,
            ...ConsentFormsShellRoutes
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(PatientManagerRoutes)],
    exports: [RouterModule]
})
export class PatientRoutingModule { }
import { EoVisitComponent } from './components/eo-visit';
import { ImeVisitComponent } from './components/ime-visit';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { PatientVisitComponent } from './components/patient-visit';
import { PatientVisitShellComponent } from './components/patient-visit-shell';

export const PatientVisitRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'patient-visit'
    },
    {
        path: 'patient-visit',
        component: PatientVisitShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Visit'
        },
         children: [
            {
                path: '',
                redirectTo: 'patient-visit',
                pathMatch: 'full'
            },
            {
                path: 'patient-visit',
                component: PatientVisitComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Visit'
                }
            },
            {
                path: 'ime-visit',
                component: ImeVisitComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'IME visit'
                },
            },
            {
                path: 'eo-visit',
                component: EoVisitComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'EO Visit'
                }
            }

        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(PatientVisitRoutes)],
    exports: [RouterModule]
})
export class PatientVisitRoutingModule { }

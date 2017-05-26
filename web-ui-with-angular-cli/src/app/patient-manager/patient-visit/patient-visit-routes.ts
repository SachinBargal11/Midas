import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { PatientVisitComponent } from './components/patient-visit';

export const PatientVisitRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'patient-visit'
    },
    {
        path: 'patient-visit',
        component: PatientVisitComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Visit'
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(PatientVisitRoutes)],
    exports: [RouterModule]
})
export class PatientVisitRoutingModule { }

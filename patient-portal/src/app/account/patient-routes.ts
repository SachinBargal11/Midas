import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsShellComponent } from './components/patients-shell';
import { PatientBasicComponent } from './components/patient-basic';
import { DemographicsComponent } from './components/demographics';
import { ValidateActiveSession } from '../commons/guards/validate-active-session';
import { ShellComponent } from '../commons/shell-component';

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
            }           
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(PatientsShellRoutes)],
    exports: [RouterModule]
})
export class PatientsRoutingModule { }

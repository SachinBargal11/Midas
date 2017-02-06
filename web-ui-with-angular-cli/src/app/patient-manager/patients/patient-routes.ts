import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsListComponent } from './components/patients-list';
import { AddPatientComponent } from './components/add-patient';
import { PatientsShellComponent } from './components/patients-shell';
import { PatientBasicComponent } from './components/patient-basic';
import { DemographicsComponent } from './components/demographics';
import { InsurancesComponent } from './components/insurances';
import { BalancesComponent } from './components/balances';
import { DocumentsComponent } from './components/documents';
import { AppointmentsComponent } from './components/appointments';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { ShellComponent } from '../../commons/shell-component';
import { AddFamilyMemberComponent } from './components/add-family-member';
import { AccidentInfoComponent } from './components/accident';
import { AttorneyComponent } from './components/attorney';

export const PatientsShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'patients'
    },
    {
        path: 'patients',
        component: PatientsListComponent,
        data: {
            breadcrumb: 'Patients'
        }
    },
    {
        path: 'patients',
        component: ShellComponent,
        data: {
            breadcrumb: 'Patients'
        },
        children: [
            {
                path: 'add',
                component: AddPatientComponent,
                data: {
                    breadcrumb: 'Add Patient'
                }
            }
        ]
    },
    {
        path: 'patients/:patientId',
        component: PatientsShellComponent,
        data: {
            breadcrumb: 'Patients',
            shell: true
        },
        children: [
            {
                path: '',
                redirectTo: 'basic',
                pathMatch: 'full'
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
                component: InsurancesComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Insurances'
                }
            },
            {
                path: 'family-member',
                component: AddFamilyMemberComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Family Member'
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
                path: 'attorney',
                component: AttorneyComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Attorney'
                }
            },
            {
                path: 'balances',
                component: BalancesComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Balances'
                }
            },
            {
                path: 'documents',
                component: DocumentsComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Documents'
                }
            },
            {
                path: 'appointments',
                component: AppointmentsComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Appointments'
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

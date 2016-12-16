import { Routes } from '@angular/router';
import { PatientsListComponent } from '../components/pages/patients/patients-list';
import { PatientDetailsComponent } from '../components/pages/patients/patient-details';
import { AddPatientComponent } from '../components/pages/patients/add-patient';
import { PatientsShellComponent } from '../components/pages/patients/patients-shell';
import { PatientBasicComponent } from '../components/pages/patients/patient-basic';
import { DemographicsComponent } from '../components/pages/patients/demographics';
import { InsurancesComponent } from '../components/pages/patients/insurances';
import { BalancesComponent } from '../components/pages/patients/balances';
import { DocumentsComponent } from '../components/pages/patients/documents';
import { AppointmentsComponent } from '../components/pages/patients/appointments';
import { PatientProfileComponent } from '../components/pages/patients/profile-patient';
import { ValidateActiveSession } from './guards/validate-active-session';

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
        path: 'patients/add',
        component: AddPatientComponent,
        data: {
            breadcrumb: 'Add Patient'
        }
    },
    {
        path: 'patients/:patientName',
        component: PatientsShellComponent,
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
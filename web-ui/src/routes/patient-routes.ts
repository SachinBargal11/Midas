import {Routes, RouterModule} from '@angular/router';
import {PatientsListComponent} from '../components/pages/patients/patients-list';
import {PatientDetailsComponent} from '../components/pages/patients/patient-details';
import {AddPatientComponent} from '../components/pages/patients/add-patient';
import {PatientsShellComponent} from '../components/pages/patients/patients-shell';
import {PatientProfileComponent} from '../components/pages/patients/profile-patient';
import {ValidateActiveSession} from './guards/validate-active-session';

export const PatientsShellRoutes: Routes = [
    {
        path: 'patients',
        component: PatientsShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            {
                path: '',
                component: PatientsListComponent
            },
            {
                path: 'add',
                component: AddPatientComponent
            },
            {
                path: '',
                component: PatientDetailsComponent,
                children: [
                    {
                        path: ':id/profile',
                        component: PatientProfileComponent
                    }
                ]
            }
        ]
    }
];
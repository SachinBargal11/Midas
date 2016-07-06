import {RouterConfig} from '@angular/router';
import {PatientsListComponent} from '../components/pages/patients/patients-list';
import {PatientDetailsComponent} from '../components/pages/patients/patient-details';
import {AddPatientComponent} from '../components/pages/patients/add-patient';
import {PatientsShellComponent} from '../components/pages/patients/patients-shell';
import {PatientProfileComponent} from '../components/pages/patients/profile-patient';

export const PatientsShellRoutes: RouterConfig = [
    {
        path: 'patients',
        component: PatientsShellComponent,
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
                path: ':id',
                component: PatientDetailsComponent,
                children: [
                    {
                        path: '',
                        component: PatientProfileComponent
                    }
                ]
            }            
        ]
    }
];
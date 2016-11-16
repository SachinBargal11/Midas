import { Routes } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { PatientsManagerShellComponent } from '../components/pages/patients/patients-manager-shell';
import { PatientsShellRoutes } from './patient-routes';

export const PatientManagerRoutes: Routes = [
    {
        path: 'patientManager',
        component: PatientsManagerShellComponent,
        canActivate: [ValidateActiveSession],
        children: PatientsShellRoutes
    },
];
import { Routes } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { MedicalProviderShellComponent } from '../components/pages/medical-provider/medical-provider-shell';
import { LocationManagementRoutes } from './location-management-routes';
import { UsersRoutes } from './users-routes';

export const MedicalProviderRoutes: Routes = [
    {
        path: 'medicalProvider',
        component: MedicalProviderShellComponent,
        canActivate: [ValidateActiveSession],
        children: [...LocationManagementRoutes,
                   ...UsersRoutes
        ]
    },
];
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { MedicalProviderShellComponent } from '../components/pages/medical-provider/medical-provider-shell';
import { LocationComponent } from '../components/pages/medical-provider/location';
import { LocationManagementRoutes } from './location-management-routes';
import { BasicComponent } from '../components/pages/location-management/basic';

export const MedicalProviderRoutes: Routes = [
    {
        path: 'medicalProvider',
        component: MedicalProviderShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            {
                path: '',
                redirectTo: 'locations'
            },
            {
                path: 'locations',
                component: LocationComponent,
                canActivate: [ValidateActiveSession]
            },
            ...LocationManagementRoutes
            // {
            //     path: 'locations/:locationName/basic',
            //     component: BasicComponent,
            //     canActivate: [ValidateActiveSession]
            // }
        ]
    },
];
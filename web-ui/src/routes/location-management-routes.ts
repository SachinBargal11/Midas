import { Routes } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { LocationShellComponent } from '../components/pages/location-management/location-shell';
import { BasicComponent } from '../components/pages/location-management/basic';
import { ScheduleComponent } from '../components/pages/location-management/schedule';

export const LocationManagementRoutes: Routes = [
    {
        path: 'location-shell',
        component: LocationShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            {
                path: '',
                redirectTo: 'basic'
            },
            {
                path: 'basic',
                component: BasicComponent,
                canActivate: [ValidateActiveSession]
            },
            {
                path: 'schedule',
                component: ScheduleComponent,
                canActivate: [ValidateActiveSession]
            }
        ]
    }
];
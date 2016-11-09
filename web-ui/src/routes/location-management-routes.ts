import { Routes } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { LocationShellComponent } from '../components/pages/location-management/location-shell';
import { BasicComponent } from '../components/pages/location-management/basic';
import { ScheduleComponent } from '../components/pages/location-management/schedule';
import { SettingsComponent } from '../components/pages/location-management/settings';
import { AccessComponent } from '../components/pages/location-management/access';

export const LocationManagementRoutes: Routes = [
    {
        path: 'locations',
        component: LocationShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            // {
            //     path: 'locations/:locationName/basic',
            //     redirectTo: 'basic'
            // },
            {
                path: 'locations/:locationName/basic',
                component: BasicComponent,
                canActivate: [ValidateActiveSession]
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
            },
            {
                path: 'settings',
                component: SettingsComponent,
                canActivate: [ValidateActiveSession]
            },
            {
                path: 'access',
                component: AccessComponent,
                canActivate: [ValidateActiveSession]
            }
        ]
    }
];
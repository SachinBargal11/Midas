import { Routes } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { LocationComponent } from '../components/pages/medical-provider/location';
import { LocationShellComponent } from '../components/pages/location-management/location-shell';
import { BasicComponent } from '../components/pages/location-management/basic';
import { ScheduleComponent } from '../components/pages/location-management/schedule';
import { SettingsComponent } from '../components/pages/location-management/settings';
import { AccessComponent } from '../components/pages/location-management/access';
import { RoomsComponent } from '../components/pages/rooms/rooms';
import { RoomsRoutes } from './rooms-routes';

export const LocationManagementRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'locations'
    },
    {
        path: 'locations',
        component: LocationComponent,
    },
    {
        path: 'locations/:locationName',
        component: LocationShellComponent,
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
            },
            // {
            //     path: 'rooms',
            //     component: RoomsComponent,
            //     canActivate: [ValidateActiveSession],
            //     children: RoomsRoutes
            // },
            ...RoomsRoutes,
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
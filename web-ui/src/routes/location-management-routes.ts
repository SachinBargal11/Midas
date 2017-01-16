import { Routes } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { LocationComponent } from '../components/pages/medical-provider/location';
import { LocationShellComponent } from '../components/pages/location-management/location-shell';
import { BasicComponent } from '../components/pages/location-management/basic';
import { ScheduleComponent } from '../components/pages/location-management/schedule';
import { SettingsComponent } from '../components/pages/location-management/settings';
import { AccessComponent } from '../components/pages/location-management/access';
import { AddLocationComponent } from '../components/pages/location-management/add-location';
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
        data: {
            breadcrumb: 'Locations'
        }
    },
    {
        path: 'locations/add',
        component: AddLocationComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Add Location'
        }
    },
    {
        path: 'locations/:locationId',
        component: LocationShellComponent,
        data: {
            breadcrumb: 'Locations',
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
                component: BasicComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Basic'
                }
            },
            {
                path: 'schedule',
                component: ScheduleComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Schedule'
                }
            },
            ...RoomsRoutes,
            // ...DoctorsRoutes,
            {
                path: 'settings',
                component: SettingsComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Settings'
                }
            },
            {
                path: 'access',
                component: AccessComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Access'
                }
            }
        ]
    }
];
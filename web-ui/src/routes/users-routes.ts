import { Routes } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { UsersListComponent } from '../components/pages/users/users-list';
import { UserShellComponent } from '../components/pages/users/users-shell';
import { UserBasicComponent } from '../components/pages/users/user-basic';
import { ScheduleComponent } from '../components/pages/location-management/schedule';
import { SettingsComponent } from '../components/pages/location-management/settings';
import { UserAccessComponent } from '../components/pages/users/user-access';
import { RoomsComponent } from '../components/pages/rooms/rooms';
import { RoomsRoutes } from './rooms-routes';
import { AddUserComponent } from '../components/pages/users/add-user';
import { UpdateUserComponent } from '../components/pages/users/update-user';
import { LocationsComponent } from '../components/pages/users/locations';
import { BillingComponent } from '../components/pages/users/Billing';

export const UsersRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
    },
    {
        path: 'users',
        component: UsersListComponent
    },
    {
        path: 'users/add',
        component: AddUserComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'users/edit/:id',
        component: UpdateUserComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'users/:userId',
        component: UserShellComponent,
        children: [
            {
                path: '',
                redirectTo: 'basic'
            },
            {
                path: 'basic',
                component: UserBasicComponent,
                canActivate: [ValidateActiveSession]
            },
            {
                path: 'access',
                component: UserAccessComponent,
                canActivate: [ValidateActiveSession]
            },
            {
                path: 'locations',
                component: LocationsComponent,
                canActivate: [ValidateActiveSession]
            },
            {
                path: 'billing',
                component: BillingComponent,
                canActivate: [ValidateActiveSession]
            }
        ]
    }
];
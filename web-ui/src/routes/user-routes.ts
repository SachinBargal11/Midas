import {Routes, RouterModule} from '@angular/router';
import {ValidateActiveSession} from './guards/validate-active-session';
import {AddUserComponent} from '../components/pages/users/add-user';
import {UpdateUserComponent} from '../components/pages/users/update-user';
import {UsersListComponent} from '../components/pages/users/users-list';

export const UsersRoutes: Routes = [
    {
        path: 'users',
        component: UsersListComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'users/add',
        component: AddUserComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'users/update/:id',
        component: UpdateUserComponent,
        canActivate: [ValidateActiveSession]
    }
];
import {Routes} from '@angular/router';
import {ValidateActiveSession} from './guards/validate-active-session';
import {AddProviderComponent} from '../components/pages/providers/add-provider';
import {UpdateProviderComponent} from '../components/pages/providers/update-provider';
import {ProvidersListComponent} from '../components/pages/providers/providers-list';

export const ProvidersRoutes: Routes = [
    {
        path: 'providers',
        component: ProvidersListComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'providers/add',
        component: AddProviderComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'providers/update/:id',
        component: UpdateProviderComponent,
        canActivate: [ValidateActiveSession]
    }
];
import {RouterConfig} from '@angular/router';
import {ValidateActiveSession} from './guards/validate-active-session';
import {AddProviderComponent} from '../components/pages/providers/add-provider';
import {ProvidersListComponent} from '../components/pages/providers/providers-list';

export const ProvidersRoutes: RouterConfig = [
    {
        path: 'providers',
        component: ProvidersListComponent,
        canActivate: [ValidateActiveSession]        
    },
    {
        path: 'providers/add',
        component: AddProviderComponent,
        canActivate: [ValidateActiveSession]
    }
];
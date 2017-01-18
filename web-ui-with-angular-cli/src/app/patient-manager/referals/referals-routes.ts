import { Routes } from '@angular/router';
import { ReferalsComponent } from './components/referals';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';

export const ReferalsShellRoutes: Routes = [
    {
        path: 'referals',
        component: ReferalsComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Referals'
        }
    }
];
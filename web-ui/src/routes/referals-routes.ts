import {Routes} from '@angular/router';
import {ReferalsComponent} from '../components/pages/patient-manager/referals';
import {ValidateActiveSession} from './guards/validate-active-session';

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
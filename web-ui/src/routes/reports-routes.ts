import {Routes} from '@angular/router';
import {ReportsComponent} from '../components/pages/users/reports';
import {ValidateActiveSession} from './guards/validate-active-session';

export const ReportsShellRoutes: Routes = [
    {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [ValidateActiveSession]
    }
];
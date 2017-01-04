import {Routes} from '@angular/router';
import {CasesComponent} from '../components/pages/patient-manager/cases';
import {ValidateActiveSession} from './guards/validate-active-session';

export const CasesShellRoutes: Routes = [
    {
        path: 'cases',
        component: CasesComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Cases'
        }
    }
];
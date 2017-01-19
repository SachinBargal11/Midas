import { Routes } from '@angular/router';
import { CasesComponent } from './components/cases';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';

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
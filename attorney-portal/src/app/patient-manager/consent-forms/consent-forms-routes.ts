import {Routes} from '@angular/router';
import {ConsentFormsComponent} from './components/consent-forms';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';

export const ConsentFormsShellRoutes: Routes = [
    {
        path: 'consentforms',
        component: ConsentFormsComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Consent'
        }
    }
];
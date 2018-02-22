import {Routes} from '@angular/router';
import {ConsentFormsComponent} from '../components/pages/patient-manager/consent-forms';
import {ValidateActiveSession} from './guards/validate-active-session';

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
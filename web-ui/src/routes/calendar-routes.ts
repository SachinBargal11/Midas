import {Routes} from '@angular/router';
import {CalendarComponent} from '../components/pages/users/calendar';
import {ValidateActiveSession} from './guards/validate-active-session';

export const CalendarShellRoutes: Routes = [
    {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [ValidateActiveSession]
    }
];
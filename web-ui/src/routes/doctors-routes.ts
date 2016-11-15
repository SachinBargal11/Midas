import {Routes} from '@angular/router';
import {ValidateActiveSession} from './guards/validate-active-session';
import {AddDoctorComponent} from '../components/pages/doctors/add-doctor';
import {UpdateDoctorComponent} from '../components/pages/doctors/update-doctor';
import {DoctorsListComponent} from '../components/pages/doctors/doctors-list';

export const DoctorsRoutes: Routes = [
    {
        path: 'doctors',
        component: DoctorsListComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'doctors/add',
        component: AddDoctorComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'doctors/edit/:id',
        component: UpdateDoctorComponent,
        canActivate: [ValidateActiveSession]
    }
];
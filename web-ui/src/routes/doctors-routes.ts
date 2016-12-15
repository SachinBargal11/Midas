import {Routes} from '@angular/router';
import {ValidateActiveSession} from './guards/validate-active-session';
import {AddDoctorComponent} from '../components/pages/doctors/add-doctor';
import {UpdateDoctorComponent} from '../components/pages/doctors/update-doctor';
import {DoctorsListComponent} from '../components/pages/doctors/doctors-list';
import {DoctorSpecialityComponent} from '../components/pages/doctors/doctor-speciality';

export const DoctorsRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'doctors'
    },
    {
        path: 'doctors',
        component: DoctorsListComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Doctors'
        }
    },
    {
        path: 'doctors/add',
        component: AddDoctorComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Add Doctor'
        }
    },
    {
        path: 'doctors/edit/:id',
        component: UpdateDoctorComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Edit Doctor'
        }
    },
    {
        path: 'doctors/speciality/:id',
        component: DoctorSpecialityComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Assign Speciality'
        }
    }
];
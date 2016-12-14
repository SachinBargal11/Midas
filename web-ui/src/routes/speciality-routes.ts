import {Routes} from '@angular/router';
import {ValidateActiveSession} from './guards/validate-active-session';
import {AddSpecialityComponent} from '../components/pages/speciality/add-speciality';
import {UpdateSpecialityComponent} from '../components/pages/speciality/update-speciality';
import {SpecialityListComponent} from '../components/pages/speciality/speciality-list';

export const SpecialityRoutes: Routes = [
    {
        path: 'specialities',
        component: SpecialityListComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Specialities'
        }
    },
    {
        path: 'specialities/add',
        component: AddSpecialityComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Add Speciality'
        }
    },
    {
        path: 'specialities/update/:id',
        component: UpdateSpecialityComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Edit Speciality'
        }
    }
];
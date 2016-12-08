import {Routes} from '@angular/router';
import {ValidateActiveSession} from './guards/validate-active-session';
import {AddSpecialityDetailsComponent} from '../components/pages/speciality-details/add-speciality-detail';
import {EditSpecialityDetailsComponent} from '../components/pages/speciality-details/edit-speciality-detail';
import {SpecialityDetailComponent} from '../components/pages/speciality-details/speciality-details';

export const SpecialityDetailsRoutes: Routes = [
    {
        path: 'speciality-details',
        component: SpecialityDetailComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'speciality-details/add',
        component: AddSpecialityDetailsComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'speciality-details/edit/:id',
        component: EditSpecialityDetailsComponent,
        canActivate: [ValidateActiveSession]
    }
];
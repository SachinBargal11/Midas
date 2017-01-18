import { Routes } from '@angular/router';
import { ValidateActiveSession } from '../../../commons/guards/validate-active-session';
import { AddSpecialityDetailsComponent } from './add-speciality-detail';
import { EditSpecialityDetailsComponent } from './edit-speciality-detail';
import { SpecialityDetailComponent } from './speciality-details';

export const SpecialityDetailsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'speciality-details',
        pathMatch: 'full'
    },
    // {
    //     path: 'basic',
    //     component: UpdateSpecialityComponent,
    //     canActivate: [ValidateActiveSession],
    //     data: {
    //         breadcrumb: 'Basic'
    //     }
    // },
    {
        path: 'speciality-details',
        component: SpecialityDetailComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Speciality Details'
        }
    },
    {
        path: 'speciality-details/add',
        component: AddSpecialityDetailsComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Add Speciality Detail'
        }
    },
    {
        path: 'speciality-details/edit/:id',
        component: EditSpecialityDetailsComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Edit Speciality Detail'
        }
    }
];
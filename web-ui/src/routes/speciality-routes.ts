import { Routes } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { AddSpecialityComponent } from '../components/pages/account-setup/speciality/add-speciality';
import { SpecialityShellComponent } from '../components/pages/account-setup/speciality/speciality-shell';
import { UpdateSpecialityComponent } from '../components/pages/account-setup/speciality/update-speciality';
import { SpecialityListComponent } from '../components/pages/account-setup/speciality/speciality-list';

import { AddSpecialityDetailsComponent } from '../components/pages/account-setup/speciality-details/add-speciality-detail';
import { EditSpecialityDetailsComponent } from '../components/pages/account-setup/speciality-details/edit-speciality-detail';
import { SpecialityDetailComponent } from '../components/pages/account-setup/speciality-details/speciality-details';

export const SpecialityRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'specialities'
    },
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
        path: 'specialities/:id',
        component: SpecialityShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Specialities',
            shell: true
        },
        children: [
            {
                path: '',
                redirectTo: 'speciality-details',
                pathMatch: 'full'
            },
            {
                path: 'basic',
                component: UpdateSpecialityComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Basic'
                }
            },
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
        ]
    }
    // {
    //     path: 'specialities/update/:id',
    //     component: UpdateSpecialityComponent,
    //     canActivate: [ValidateActiveSession],
    //     data: {
    //         breadcrumb: 'Edit Speciality'
    //     }
    // }
];
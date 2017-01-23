import { Routes } from '@angular/router';
import { ValidateActiveSession } from '../../../commons/guards/validate-active-session';
// import { AddSpecialityComponent } from './add-speciality';
import { SpecialityShellComponent } from './speciality-shell';
// import { UpdateSpecialityComponent } from './update-speciality';
import { SpecialityListComponent } from './speciality-list';

import { AddSpecialityDetailsComponent } from '../speciality-details/add-speciality-detail';
import { EditSpecialityDetailsComponent } from '../speciality-details/edit-speciality-detail';
// import { SpecialityDetailComponent } from '../speciality-details/speciality-details';

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
    // {
    //     path: 'specialities/add',
    //     component: AddSpecialityComponent,
    //     canActivate: [ValidateActiveSession],
    //     data: {
    //         breadcrumb: 'Add Speciality'
    //     }
    // },
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
            // {
            //     path: 'basic',
            //     component: UpdateSpecialityComponent,
            //     canActivate: [ValidateActiveSession],
            //     data: {
            //         breadcrumb: 'Basic'
            //     }
            // },
            // {
            //     path: 'speciality-details',
            //     component: SpecialityDetailComponent,
            //     canActivate: [ValidateActiveSession],
            //     data: {
            //         breadcrumb: 'Speciality Details'
            //     }
            // },
            {
                path: 'add',
                component: AddSpecialityDetailsComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Speciality Detail'
                }
            },
            {
                path: 'edit/:id',
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
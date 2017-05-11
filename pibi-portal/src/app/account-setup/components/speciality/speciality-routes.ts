import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../../commons/guards/validate-active-session';
// import { AddSpecialityComponent } from './add-speciality';
import { SpecialityShellComponent } from './speciality-shell';
// import { UpdateSpecialityComponent } from './update-speciality';
import { SpecialityListComponent } from './speciality-list';
import { ShellComponent } from '../../../commons/shell-component';
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
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Specialities'
        },
        children: [
            {
                path: '',
                component: SpecialityListComponent,
                data: {
                    breadcrumb: 'root'
                }
            },
            {
                path: ':id',
                component: SpecialityShellComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'root'
                },
                children: [
                    {
                        path: 'add',
                        component: AddSpecialityDetailsComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Add Speciality Detail'
                        }
                    },
                    {
                        path: 'edit',
                        component: EditSpecialityDetailsComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Speciality Detail'
                        }
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(SpecialityRoutes)],
    exports: [RouterModule]
})
export class SpecialityRoutingModule { }
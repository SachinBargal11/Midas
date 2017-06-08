import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../../commons/guards/validate-active-session';
import { AdjusterMasterListComponent } from './adjuster-master-list';
import { ShellComponent } from '../../../commons/shell-component';
import { AddAdjusterComponent } from './add-adjuster';
import { EditAdjusterComponent } from './edit-adjuster';


export const AdjusterRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'adjuster'
    },
    {
        path: 'adjuster',
        component: AdjusterMasterListComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Adjuster List'
        }
    },
    {
        path: 'adjuster',
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Adjuster List'
        },
        children: [
            {
                path: 'add',
                component: AddAdjusterComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Adjuster'
                }
            },
            {
                path: 'edit/:id',
                component: EditAdjusterComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Edit Adjuster'
                }
            }
        ]
    }        
];

@NgModule({
    imports: [RouterModule.forChild(AdjusterRoutes)],
    exports: [RouterModule]
})
export class AdjusterRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../../commons/guards/validate-active-session';
import { AttorneyMasterListComponent  } from './attorney-master-list';
import { ShellComponent } from '../../../commons/shell-component';
import { AddAttorneyComponent } from './add-attorney';
import { EditAttorneyComponent  } from './edit-attorney';


export const AttorneyRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'attorney'
    },
    {
        path: 'attorney',
        component: AttorneyMasterListComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Attorney List'
        }
    },
    {
        path: 'attorney',
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Attorney List'
        },
        children: [
            {
                path: 'add',
                component: AddAttorneyComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Attorney'
                }
            },
            {
                path: 'edit/:id',
                component: EditAttorneyComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Edit Attorney'
                }
            }
        ]
    }        
];

@NgModule({
    imports: [RouterModule.forChild(AttorneyRoutes)],
    exports: [RouterModule]
})
export class AttorneyRoutingModule { }
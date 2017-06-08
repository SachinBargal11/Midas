import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../../commons/guards/validate-active-session';
import { ShellComponent } from '../../../commons/shell-component';
import { InsuranceMasterListComponent } from './insurance-master-list';
import { AddInsuranceMasterComponent } from './add-insurance-master';
import { EditInsuranceMasterComponent } from './edit-insurance-master';


export const InsuranceMasterRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'insurance-masters'
    },
    {
        path: 'insurance-masters',
        component: InsuranceMasterListComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Insurance Masters'
        }
    },
    {
        path: 'insurance-masters',
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Insurance Masters'
        },
        children: [
            {
                path: 'add',
                component: AddInsuranceMasterComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Insurance Master'
                }
            },
            {
                path: 'edit/:id',
                component: EditInsuranceMasterComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Edit Insurance Master'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(InsuranceMasterRoutes)],
    exports: [RouterModule]
})
export class InsuranceMasterRoutingModule { }

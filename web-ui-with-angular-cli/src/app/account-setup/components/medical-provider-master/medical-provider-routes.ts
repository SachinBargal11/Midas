import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../../commons/guards/validate-active-session';
import { MedicalProviderListComponent } from './medical-provider-list';
import { ShellComponent } from '../../../commons/shell-component';
import { AddMedicalProviderComponent } from './add-medical-provider';


export const MedicalProviderRoutes: Routes = [

    {
        path: '',
        pathMatch: "full",
        redirectTo: 'medical-provider-master'
    },
    {
        path: 'medical-provider-master',
        component: MedicalProviderListComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Medical Provider List'
        }
    },
    {
        path: 'medical-provider-master',
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Medical Provider List'
        },
        children: [
            {
                path: 'add',
                component: AddMedicalProviderComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Medical Provider'
                }
            },
            {
                path: 'edit/:id',
                component: AddMedicalProviderComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Edit Medical Provider'
                }
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(MedicalProviderRoutes)],
    exports: [RouterModule]
})

export class MedicalProviderRoutingModule { }
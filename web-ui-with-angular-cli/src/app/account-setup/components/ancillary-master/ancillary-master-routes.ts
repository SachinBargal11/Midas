import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../../commons/guards/validate-active-session';
import { AncillaryListComponent } from './ancillary-master-list';
import { ShellComponent } from '../../../commons/shell-component';
import { AddAncillaryComponent } from './add-ancillary-master';
import { EditAncillaryComponent } from './edit-ancillary-master';

export const AncillaryRoutes: Routes = [

    {
        path: '',
        pathMatch: "full",
        redirectTo: 'ancillary-master'
    },
    {
        path: 'ancillary-master',
        component: AncillaryListComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Ancillary List'
        }
    },
    {
        path: 'ancillary-master',
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Ancillary List'
        },
        children: [
            {
                path: 'add',
                component: AddAncillaryComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Ancillary'
                }
            },
            {
                path: 'edit/:id',
                component: EditAncillaryComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Edit Ancillary'
                }
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(AncillaryRoutes)],
    exports: [RouterModule]
})

export class MedicalProviderRoutingModule { }
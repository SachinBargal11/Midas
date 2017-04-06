import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';

import { AddDocConsentFormComponent } from './components/add-consent-form'
import { ConsentDocListComponent } from './components/list-consent-form'
import { ShellComponent } from '../../commons/shell-component';
import { SessionStore } from '../../commons/stores/session-store';

import { EditDocConsentFormComponent } from './components/edit-consent-form';
export const ConsentShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'consentForm'
    },
    {
        path: 'consent-form',
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Consent Form'
        },
        children: [
            {
                path: '',
                component: ConsentDocListComponent,
                data: {
                    breadcrumb: 'root'
                }
            },

            {
                path: 'add',
                component: AddDocConsentFormComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Consent form'
                }
            }, {
                path: 'edit/:id',
                component: EditDocConsentFormComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Edit Consent form'
                }
            },

        ]
    }

];
@NgModule({
    imports: [RouterModule.forChild(ConsentShellRoutes)],
    exports: [RouterModule]
})
export class ConsentShellRoutingModule { }

    // {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'consentForm'
    // },
    // {
    //     path: '',
    //     component: AddConsentFormComponent,
    //     canActivate: [ValidateActiveSession],
    //     data: {
    //         breadcrumb: 'root'
    //     }
    // },
    // {
    //     path: '',
    //     component: ConsentListComponent,
    //     canActivate: [ValidateActiveSession],
    //     data: {
    //         breadcrumb: 'root'
    //     },
    //     children: [
    //         {
    //             path: '',
    //             component: ConsentListComponent,
    //             canActivate: [ValidateActiveSession],
    //             data: {
    //                 breadcrumb: 'root'
    //             }
    //         },
    //         {
    //             path: 'add',
    //             component: AddConsentFormComponent,
    //             canActivate: [ValidateActiveSession],
    //             data: {
    //                 breadcrumb: 'consentForm'
    //             }
    //         }            
    //     ]







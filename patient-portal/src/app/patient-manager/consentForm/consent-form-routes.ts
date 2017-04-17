import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';

import { AddCompneyConsentComponent } from '../consentForm/components/compney-add-consent';

import { ListCompneyConsentComponent } from './components/list-compney-consent'
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
                component: ListCompneyConsentComponent,
                data: {
                    breadcrumb: 'root'
                }
            },

            {
                path: 'add',
                component: AddCompneyConsentComponent,
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







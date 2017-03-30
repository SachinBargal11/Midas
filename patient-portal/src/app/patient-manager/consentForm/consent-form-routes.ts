import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';

import { AddConsentFormComponent } from './components/add-consent-form'
import { ConsentListComponent } from './components/list-consent-form'
import { ShellComponent } from '../../commons/shell-component';
import { SessionStore } from '../../commons/stores/session-store';
export const ConsentShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'consentForm'
    },
    {
        path: 'consentForm',
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'consentForm'
        },
        children: [
            {
                path: '',
                component: ConsentListComponent,
                data: {
                    breadcrumb: 'root'
                }
            },

            {
                path: 'add',
                component: AddConsentFormComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Consent form'
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







import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';

import { ListCompanyConsentComponent } from './components/list-company-consent';
import { AddCompanyConsentComponent } from '../consentForm/components/add-company-consent';
import { EditCompanyConsentComponent } from './components/edit-company-consent'
import { ShellComponent } from '../../commons/shell-component';
import { SessionStore } from '../../commons/stores/session-store';

export const ConsentShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'consent'
    },
    {
        path: 'consent',
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Consent'
        },
        children: [
            {
                path: '',
                component: ListCompanyConsentComponent,
                data: {
                    breadcrumb: 'root'
                }
            },
            {
                path: ':caseId',
                component: ShellComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'root'
                },
                children: [
                    {
                        path: 'add',
                        component: AddCompanyConsentComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Add Consent'
                        }
                    }
                ]
            },

            // {
            //     path: 'add',
            //     component: AddCompanyConsentComponent,
            //     canActivate: [ValidateActiveSession],
            //     data: {
            //         breadcrumb: 'Add Consent form'
            //     }
            // }, 
            {
                path: 'edit/:id',
                component: EditCompanyConsentComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Edit Consent'
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

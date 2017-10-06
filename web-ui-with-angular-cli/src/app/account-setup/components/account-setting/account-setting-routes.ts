import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../../commons/guards/validate-active-session';
import { ValidateDoctorSession } from '../../../commons/guards/validate-doctor-session';
import { ValidateInActiveDoctorSession } from '../../../commons/guards/validate-inactivedoctor-session';
import { ShellComponent } from '../../../commons/shell-component';
import { AccountSettingShellComponent } from './account-setting-shell';
import { ProcedureCodeComponent } from './procedure-code-master';
import { AddProcedureCodeComponent } from './add-procedure-code-master';
import { DocumentTypeComponent } from './document-type';
import { AccountGeneralSettingComponent } from './account-general-settings'

export const AccountSettingShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'account-setting'
    },
    {
        path: 'account-setting',
        component: AccountSettingShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Account Setting'
        },
        children: [
            {
                path: '',
                redirectTo: 'general-settings',
                pathMatch: 'full'
            },
            {
                path: 'general-settings',
                component: AccountGeneralSettingComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'General Settings'
                }
            },
            {
                path: 'procedure-codes',
                component: ShellComponent,
                outlet: 'procedure-codes',
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Procedure Codes'
                },
                children: [
                    {
                        path: '',
                        component: ProcedureCodeComponent,
                        data: {
                            breadcrumb: 'root'
                        }
                    },
                    {
                        path: 'add',
                        component: AddProcedureCodeComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Add procedures'
                        }
                    }
                ]
            },
            {
                path: 'document-types',
                component: DocumentTypeComponent,
                outlet: 'document-types',
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Document Types'
                }
            }

        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(AccountSettingShellRoutes)],
    exports: [RouterModule]
})
export class AccountSettingShellRoutingModule { }
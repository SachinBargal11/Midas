// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { ValidateActiveSession } from '../../../commons/guards/validate-active-session';
// import { ValidateDoctorSession } from '../../../commons/guards/validate-doctor-session';
// import { ValidateInActiveDoctorSession } from '../../../commons/guards/validate-inactivedoctor-session';
// import { ShellComponent } from '../../../commons/shell-component';
// import { AccountSettingShellComponent } from './account-setting-shell';
// import { ProcedureCodeComponent } from './procedure-code-master';
// import { DocumentTypeComponent } from './document-type';


// export const AccountSettingShellRoutes: Routes = [
//     {
//         path: '',
//         pathMatch: 'full',
//         redirectTo: 'account-setting/document-types'
//     },
//     {
//         path: 'account-setting',
//         component: AccountSettingShellComponent,
//         canActivate: [ValidateActiveSession],
//         data: {
//             breadcrumb: 'Account Setting'
//         },
//         children: [
//             {
//                 path: 'procedure-codes',
//                 component: ProcedureCodeComponent,
//                 canActivate: [ValidateActiveSession],
//                 data: {
//                     breadcrumb: 'Procedure Codes'
//                 }
//             },
//             {
//                 path: 'document-types',
//                 component: DocumentTypeComponent,
//                 canActivate: [ValidateActiveSession],
//                 data: {
//                     breadcrumb: 'Document Types'
//                 }
//             }
//         ]
//     }
// ];
// @NgModule({
//     imports: [RouterModule.forChild(AccountSettingShellRoutes)],
//     exports: [RouterModule]
// })
// export class AccountSettingShellRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../../commons/guards/validate-active-session';
import { ValidateDoctorSession } from '../../../commons/guards/validate-doctor-session';
import { ValidateInActiveDoctorSession } from '../../../commons/guards/validate-inactivedoctor-session';
import { ShellComponent } from '../../../commons/shell-component';
import { AccountSettingShellComponent } from './account-setting-shell';
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
                path: 'document-types',
                component: DocumentTypeComponent,
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
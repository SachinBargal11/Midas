import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { AccountSetupShellComponent } from '../components/pages/account-setup/account-setup-shell';
import { SpecialityRoutes } from './speciality-routes';
import { SpecialityDetailsRoutes } from './speciality-details-routes';


let AccountSetupRoutes: Routes = [
    {
        path: 'account-setup',
        component: AccountSetupShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            ...SpecialityRoutes,
            ...SpecialityDetailsRoutes
        ],
        data: {
            breadcrumb: 'Account Setup'
        }
    },
];


@NgModule({
    imports: [RouterModule.forChild(AccountSetupRoutes)],
    exports: [RouterModule]
})
export class AccountSetupRoutingModule { }
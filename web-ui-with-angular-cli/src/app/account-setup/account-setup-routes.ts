import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../commons/guards/validate-active-session';
import { AccountSetupShellComponent } from './account-setup-shell';
import { SpecialityRoutes } from './components/speciality/speciality-routes';
import { SpecialityDetailsRoutes } from './components/speciality-details/speciality-details-routes';


let AccountSetupRoutes: Routes = [
    {
        path: '',
        component: AccountSetupShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            ...SpecialityRoutes,
            ...SpecialityDetailsRoutes
        ],
        data: {
            breadcrumb: 'Account Setup'
        }
    }
];


@NgModule({
    imports: [RouterModule.forChild(AccountSetupRoutes)],
    exports: [RouterModule]
})
export class AccountSetupRoutingModule { }
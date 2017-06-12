import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../commons/guards/validate-active-session';
import { AccountSetupShellComponent } from './account-setup-shell';
import { SpecialityRoutes } from './components/speciality/speciality-routes';
import { AdjusterRoutes } from './components/AdjusterMaster/adjuster-routes';
import { AttorneyRoutes } from './components/AttorneyMaster/attorney-routes';
import { InsuranceMasterRoutes } from './components/insurance-master/insurance-master-routes';
import { MedicalProviderRoutes } from './components/medical-provider-master/medical-provider-routes';
import { AccountSettingShellRoutes } from './components/account-setting/account-setting-routes';
import { AncillaryRoutes } from './components/ancillary-master/ancillary-master-routes';

let AccountSetupRoutes: Routes = [
    {
        path: '',
        component: AccountSetupShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            ...AccountSettingShellRoutes,
            ...SpecialityRoutes,
            ...AdjusterRoutes,
            ...AttorneyRoutes,
            ...InsuranceMasterRoutes,
            ...MedicalProviderRoutes,
            ...AncillaryRoutes
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
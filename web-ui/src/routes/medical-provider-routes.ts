import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { MedicalProviderShellComponent } from '../components/pages/medical-provider/medical-provider-shell';
import { LocationManagementRoutes } from './location-management-routes';
import { UsersRoutes } from './users-routes';
import { CalendarShellRoutes } from './calendar-routes';
import { ReportsShellRoutes } from './reports-routes';

let MedicalProviderRoutes: Routes = [
    {
        path: 'medical-provider',
        component: MedicalProviderShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            ...LocationManagementRoutes,
            ...UsersRoutes,
            ...CalendarShellRoutes,
            ...ReportsShellRoutes
        ],
        data: {
            breadcrumb: 'Medical Provider'
        }
    },
];


@NgModule({
    imports: [RouterModule.forChild(MedicalProviderRoutes)],
    exports: [RouterModule]
})
export class MedicalProviderRoutingModule { }


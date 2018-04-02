import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../commons/guards/validate-active-session';
import { MedicalProviderShellComponent } from './medical-provider-shell';
import { LocationManagementRoutes } from './locations/location-management-routes';
import { UsersRoutes } from './users/users-routes';
import { CalendarRoutes } from './calendar/calendar-routes';
import { ReportsRoutes } from './reports/reports-routes';
import { RoomsRoutes } from './rooms/rooms-routes';

let MedicalProviderRoutes: Routes = [
     {
        path: '',
        component: MedicalProviderShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            ...LocationManagementRoutes,
            ...UsersRoutes,
            ...CalendarRoutes,
            ...ReportsRoutes
        ],
        data: {
            breadcrumb: 'Office Manager'
        }
    }
];


@NgModule({
    imports: [RouterModule.forChild(MedicalProviderRoutes)],
    exports: [RouterModule]
})
export class MedicalProviderRoutingModule { }


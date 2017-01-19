import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard';
import { ValidateActiveSession } from '../commons/guards/validate-active-session';

export const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [ValidateActiveSession],
        data: {
          breadcrumb: 'Dashboard'
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
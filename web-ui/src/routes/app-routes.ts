import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/pages/dashboard';
import { ValidateActiveSession } from './guards/validate-active-session';

export const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ValidateActiveSession],
        data: {
          breadcrumb: 'Dashboard'
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
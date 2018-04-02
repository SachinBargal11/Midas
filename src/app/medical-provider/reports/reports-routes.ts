import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './components/reports';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';

export const ReportsRoutes: Routes = [
    {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [ValidateActiveSession]
    }
];


@NgModule({
    imports: [RouterModule.forChild(ReportsRoutes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }
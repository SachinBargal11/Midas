import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { ShellComponent } from '../../commons/shell-component';
import { CaseManagerComponent } from './components/cases-manager-list';

export const CaseManagerRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'case-manager'
    },
    {
        path: 'case-manager',
        component: CaseManagerComponent,
        data: {
            breadcrumb: 'Case Manager'
        },
    }
];
@NgModule({
    imports: [RouterModule.forChild(CaseManagerRoutes)],
    exports: [RouterModule]
})
export class CaseManagerRoutingModule { }

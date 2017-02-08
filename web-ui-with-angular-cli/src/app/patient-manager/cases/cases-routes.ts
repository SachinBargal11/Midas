 import { NgModule } from '@angular/core';
 import { Routes, RouterModule } from '@angular/router';
 import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
 import { CaseComponent } from './components/case';
 import { CasesListComponent } from './components/cases-list';
import { ShellComponent } from '../../commons/shell-component';


export const CasesShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cases'
    },
    {
        path: 'cases',
        component: CasesListComponent,
        data: {
            breadcrumb: 'Cases'
        }
    },
    {
        path: 'cases',
        component: ShellComponent,
        data: {
            breadcrumb: 'Cases'
        },
        children: [
            {
                path: 'add',
                component: CaseComponent,
                data: {
                    breadcrumb: 'Add Case'
                }
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(CasesShellRoutes)],
    exports: [RouterModule]
})
export class CasesShellRoutingModule { }

 import { NgModule } from '@angular/core';
 import { Routes, RouterModule } from '@angular/router';
 import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
//  import { CasesComponent } from './components/cases';
 import { AddCaseShellComponent } from './components/add-case-shell';
 import { CaseComponent } from './components/case';
 import { CasesListComponent } from './components/cases-list';
 import { EmployeeComponent} from './components/employee';
 import { InsuranceComponent } from './components/insurances';


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
        path: 'cases/add',
        component: AddCaseShellComponent,
        data: {
            breadcrumb: 'Add-Cases'
        },
        children: [
            {
                path: '',
                redirectTo: 'case',
                pathMatch: 'full'
            },
            {
                path: 'case',
                component: CaseComponent,
                data: {
                    breadcrumb: 'Case'
                }
            },
            {
                path: 'employee',
                component: EmployeeComponent,
                data: {
                    breadcrumb: 'Employee'
                }
            },
            {
                path: 'insurance',
                component: InsuranceComponent,
                data: {
                    breadcrumb: 'Insurance'
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

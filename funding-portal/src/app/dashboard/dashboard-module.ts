import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonsModule } from '../commons/commons-module';
import { DashboardComponent } from './components/dashboard';
import { Dashboard2Component } from './components/dashboard2';
import { DashboardShellComponent } from './components/dashboard-shell';
import { DashboardRoutingModule } from './dashboard-routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonsModule,
        DashboardRoutingModule
    ],
    declarations: [
        DashboardShellComponent,
        DashboardComponent,
        Dashboard2Component
    ],
    providers: [
    ]
})
export class DashboardModule {
}

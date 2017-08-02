import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonsModule } from '../commons/commons-module';
import { DashboardComponent } from './components/dashboard';
import { DashboardRoutingModule } from './dashboard-routes';
import { PatientManagerModule } from '../patient-manager/patient-manager-module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonsModule,
        DashboardRoutingModule,
        PatientManagerModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [
    ]
})
export class DashboardModule {
}

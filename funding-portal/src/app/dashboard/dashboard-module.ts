import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonsModule } from '../commons/commons-module';
import { DashboardComponent } from './components/dashboard';
import { Dashboard2Component } from './components/dashboard2';
import { DashboardShellComponent } from './components/dashboard-shell';
import { DashboardRoutingModule } from './dashboard-routes';
import { AccountSetupModule } from '../account-setup/account-setup-module';
import { DoctorManagerModule } from '../doctor-manager/doctor-manager-module';
import { MedicalProviderModule } from '../medical-provider/medical-provider-module';
import { PatientManagerModule } from '../patient-manager/patient-manager-module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonsModule,
        DashboardRoutingModule,
        AccountSetupModule,
        DoctorManagerModule,
        MedicalProviderModule,
        PatientManagerModule
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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonsModule } from '../commons/commons-module';
import { DashboardComponent } from './components/dashboard';
import { DashboardRoutingModule } from './dashboard-routes';
import { AccountSetupModule } from '../account-setup/account-setup-module';
import { DoctorManagerModule } from '../doctor-manager/doctor-manager-module';
import { MedicalProviderModule } from '../medical-provider/medical-provider-module';
import { PatientManagerModule } from '../patient-manager/patient-manager-module';
import { UserSettingStore } from '../commons/stores/user-setting-store';
import { UserSettingService } from '../commons/services/user-setting-service';
import { PushNotificationStore } from '../commons/stores/push-notification-store';
import { PushNotificationService } from '../commons/services/push-notification-service';

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
        DashboardComponent
    ],
    providers: [
        UserSettingStore,
        UserSettingService,
        PushNotificationStore,
        PushNotificationService
    ]
})
export class DashboardModule {
}

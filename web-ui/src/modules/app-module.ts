/** Angular Modules */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Featured modules */
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SharedModule } from './shared-module';
// import { MedicalProviderModule } from './medical-provider-module';
// import { AccountSetupModule } from './account-setup-module';
// import { DoctorsModule } from './doctors-module';
// import { PatientModule } from './patient-module';
// import { AccountModule } from './account-module';

/** Application Services and Providers */

// import { StatesStore } from '../stores/states-store';
// import { StateService } from '../services/state-service';

// import { NotificationsStore } from '../stores/notifications-store';
// import { APP_ROUTER_PROVIDER } from '../routes/app-routes';
// import { ValidateActiveSession } from '../routes/guards/validate-active-session';
// import { ValidateInActiveSession } from '../routes/guards/validate-inactive-session';
// import { ProgressBarService } from '../services/progress-bar-service';
// import { ProgressBarComponent } from '../components/elements/progress-bar';

/** Components */

import { DashboardComponent } from '../components/pages/dashboard';
// import { AppHeaderComponent } from '../components/elements/app-header';
// import { MainNavComponent } from '../components/elements/main-nav';
// import { BreadcrumbComponent } from '../components/elements/breadcrumb';

// enableProdMode();

import { DropdownModule } from 'ng2-bootstrap';

import {AppRoutingModule} from '../routes/app-routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2BootstrapModule,
        // AccountSetupModule,
        // DoctorsModule,
        // MedicalProviderModule,
        // PatientModule,
        // AccountModule,
        AppRoutingModule,
        DropdownModule
    ],
    declarations: [
        DashboardComponent,
        // AppHeaderComponent,
        // MainNavComponent,
        // BreadcrumbComponent,
        // ProgressBarComponent
    ],
    providers: [
        // ProgressBarService,
        // StatesStore,
        // StateService,
        // NotificationsStore,
        // ValidateActiveSession,
        // ValidateInActiveSession,
        // FormBuilder
    ]
})
export class AppModule {
}

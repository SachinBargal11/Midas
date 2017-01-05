/** Angular Modules */

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { enableProdMode, NgModule } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppRoot } from '../components/AppRoot';
import { HttpModule } from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

/* Featured modules */

import { SharedModule } from './shared-module';
import { MedicalProviderModule } from './medical-provider-module';
import { AccountSetupModule } from './account-setup-module';
import { DoctorsModule } from './doctors-module';
import { PatientModule } from './patient-module';
import { AccountModule } from './account-module';

/** Application Services and Providers */

import { StatesStore } from '../stores/states-store';
import { StateService } from '../services/state-service';

import { NotificationsStore } from '../stores/notifications-store';
import { APP_ROUTER_PROVIDER } from '../routes/app-routes';
import { ValidateActiveSession } from '../routes/guards/validate-active-session';
import { ValidateInActiveSession } from '../routes/guards/validate-inactive-session';
import { ProgressBarService } from '../services/progress-bar-service';
import { ProgressBarComponent } from '../components/elements/progress-bar';

/** Components */

import { DashboardComponent } from '../components/pages/dashboard';
import { AppHeaderComponent } from '../components/elements/app-header';
import { MainNavComponent } from '../components/elements/main-nav';
import { BreadcrumbComponent } from '../components/elements/breadcrumb';

// enableProdMode();

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        APP_ROUTER_PROVIDER,
        Ng2BootstrapModule,
        HttpModule,
        SharedModule,
        AccountSetupModule,
        DoctorsModule,
        MedicalProviderModule,
        PatientModule,
        AccountModule
    ],
    declarations: [
        AppRoot,
        DashboardComponent,
        AppHeaderComponent,
        MainNavComponent,
        BreadcrumbComponent,
        ProgressBarComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ProgressBarService,
        StatesStore,
        StateService,
        NotificationsStore,
        ValidateActiveSession,
        ValidateInActiveSession,
        FormBuilder
    ],
    bootstrap: [
        AppRoot
    ]
})
export class AppModule {
}

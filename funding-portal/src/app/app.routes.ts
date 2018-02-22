import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './no-content-component';
import { ValidateDoctorSession } from './commons/guards/validate-doctor-session';
import { ValidateActiveSession } from './commons/guards/validate-active-session';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard/funding-receivable', pathMatch: 'full' },
    // { path: '', redirectTo: '/patient-manager/appointments', pathMatch: 'full', canActivate: [ValidateDoctorSession] },
    { path: 'dashboard', loadChildren: 'app/dashboard/dashboard-module#DashboardModule', data: { breadcrumb: 'root' } },
    { path: 'account', loadChildren: 'app/account/account-module#AccountModule', data: { breadcrumb: 'root' } },
    { path: 'doctor-manager', loadChildren: 'app/doctor-manager/doctor-manager-module#DoctorManagerModule', data: { breadcrumb: 'root' } },
    { path: 'patient-manager', loadChildren: 'app/patient-manager/patient-manager-module#PatientManagerModule', data: { breadcrumb: 'root' } },
    { path: 'medical-provider', loadChildren: 'app/medical-provider/medical-provider-module#MedicalProviderModule', data: { breadcrumb: 'root' } },
    { path: 'account-setup', loadChildren: 'app/account-setup/account-setup-module#AccountSetupModule', data: { breadcrumb: 'root' } },
    { path: 'event', loadChildren: 'app/event/event-module#EventModule', data: { breadcrumb: 'root' }, canActivate: [ValidateActiveSession] },
    { path: '404', component: NoContentComponent },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
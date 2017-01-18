import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './no-content-component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'account', loadChildren: 'app/account/account-module#AccountModule' },
    { path: 'patient-manager', loadChildren: 'app/patient-manager/patient-manager-module#PatientManagerModule' },
    { path: 'medical-provider', loadChildren: 'app/medical-provider/medical-provider-module#MedicalProviderModule' },
    { path: 'account-setup', loadChildren: 'app/account-setup/account-setup-module#AccountSetupModule' },
    { path: '404', component: NoContentComponent },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RootRoutingModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
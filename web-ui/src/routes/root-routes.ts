import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    // { path: 'account', loadChildren: 'modules/account-module#AccountModule' },
    // { path: 'patient-manager', loadChildren: 'modules/patient-module#PatientModule' },
    // { path: 'medical-provider', loadChildren: 'modules/medical-provider-module#MedicalProviderModule' },
    // { path: 'account-setup', loadChildren: 'modules/account-setup-module#AccountSetupModule' }
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
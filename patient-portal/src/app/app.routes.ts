import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './no-content-component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: 'app/dashboard/dashboard-module#DashboardModule' },
    { path: 'account', loadChildren: 'app/account/account-module#AccountModule' },
    { path: '404', component: NoContentComponent },
    { path: '**',  redirectTo: '/404' }
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
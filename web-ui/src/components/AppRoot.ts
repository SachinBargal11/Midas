import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {LoginComponent} from './pages/login';
import {SignupComponent} from './pages/signup';
import {DashboardComponent} from './pages/dashboard';
import {PatientsShellComponent} from './pages/patients/patients-shell';
import {AppHeaderComponent} from './elements/app-header';
import {MainNavComponent} from './elements/main-nav';

@RouteConfig([
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/signup', name: 'Signup', component: SignupComponent },
    { path: '/dashboard', name: 'Dashboard', component: DashboardComponent },
    { path: '/patients/...', name: 'Patients', component: PatientsShellComponent },
    { path: '/*other', name: 'Other', redirectTo: ['Login'] }
])

@Component({
    selector: 'app-root',
    templateUrl: 'templates/AppRoot.html',
    directives: [ROUTER_DIRECTIVES, AppHeaderComponent, MainNavComponent]
})

export class AppRoot {
    constructor(public router: Router) {

    }
}

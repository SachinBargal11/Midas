import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {Location} from '@angular/common';
import {LoginComponent} from './pages/login';
import {SignupComponent} from './pages/signup';
import {DashboardComponent} from './pages/dashboard';
import {PatientsShellComponent} from './pages/patients/patients-shell';
import {AppHeaderComponent} from './elements/app-header';
import {MainNavComponent} from './elements/main-nav';
import {SessionStore} from '../stores/session-store';
import {NotificationComponent} from './elements/notification';
import {NotificationsStore} from '../stores/notifications-store';

@Component({
    selector: 'app-root',
    templateUrl: 'templates/AppRoot.html',
    directives: [
        ROUTER_DIRECTIVES,
        AppHeaderComponent,
        MainNavComponent,
        NotificationComponent
    ]
})

export class AppRoot implements OnInit {

    constructor(
        private _router: Router,
        private _sessionStore: SessionStore,
        private _notificationsStore: NotificationsStore
    ) {

    }

    ngOnInit() {
        
        this._sessionStore.authenticate().subscribe(
            (response) => {

            },
            error => {
                this._router.navigate(['/login']);
            }
        )
    }

}

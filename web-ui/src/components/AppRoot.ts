import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {Location} from '@angular/common';
import {SessionStore} from '../stores/session-store';
import {NotificationsStore} from '../stores/notifications-store';
import {StatesStore} from '../stores/states-store';
import {SpecialityStore} from '../stores/speciality-store';
import {StateService} from '../services/state-service';

@Component({
    selector: 'app-root',
    templateUrl: 'templates/AppRoot.html'
})

export class AppRoot implements OnInit {

    constructor(
        private _router: Router,
        private _sessionStore: SessionStore,
        private _notificationsStore: NotificationsStore,
        private _statesStore: StatesStore,
        private _specialityStore: SpecialityStore,
        private viewContainerRef: ViewContainerRef
    ) {
    }

    ngOnInit() {

        this._sessionStore.authenticate().subscribe(
            (response) => {

            },
            error => {
                this._router.navigate(['/login']);
            }
        ),
        this._specialityStore.loadInitialData();
        this._statesStore.getStates();
    }
}

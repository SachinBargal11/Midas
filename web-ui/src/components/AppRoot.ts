import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../stores/session-store';
import {NotificationsStore} from '../stores/notifications-store';
import {StatesStore} from '../stores/states-store';
import {SpecialityStore} from '../stores/speciality-store';

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
        this._specialityStore.getSpecialities();
        this._statesStore.getStates();
    }
}

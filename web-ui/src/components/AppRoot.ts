import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../stores/session-store';
import {NotificationsStore} from '../stores/notifications-store';
// import {StatesStore} from '../stores/states-store';
// import {SpecialityStore} from '../stores/speciality-store';
import { ProgressBarService } from '../services/progress-bar-service';

@Component({
    selector: 'app-root',
    templateUrl: 'templates/AppRoot.html'
})

export class AppRoot implements OnInit {

    constructor(
        private _router: Router,
        private _sessionStore: SessionStore,
        private _notificationsStore: NotificationsStore,
        // private _statesStore: StatesStore,
        // private _specialityStore: SpecialityStore,
        private _progressBarService: ProgressBarService
    ) {
    }

    ngOnInit() {

        this._sessionStore.authenticate().subscribe(
            (response) => {

            },
            error => {
                // this._router.navigate(['/account/login']);
            }
        );
        // this._specialityStore.getSpecialities();
        // this._statesStore.getStates();
    }
}

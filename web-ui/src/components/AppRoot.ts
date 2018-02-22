import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../stores/session-store';
import {NotificationsStore} from '../stores/notifications-store';
// import {StatesStore} from '../stores/states-store';
// import {SpecialityStore} from '../stores/speciality-store';
import { ProgressBarService } from '../services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-root',
    templateUrl: 'templates/AppRoot.html'
})

export class AppRoot implements OnInit {
    options = {
        timeOut: 5000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false
    };

    constructor(
        private _router: Router,
        private _sessionStore: SessionStore,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
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

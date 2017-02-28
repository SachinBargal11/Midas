import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { LocationDetails } from '../../locations/models/location-details';
import { LocationsStore } from '../../locations/stores/locations-store';

@Component({
    selector: 'locations',
    templateUrl: './locations.html'
})


export class LocationsComponent implements OnInit {
    locations: LocationDetails[];
    constructor(
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _locationsStore: LocationsStore,
        public _sessionStore: SessionStore,
        private _notificationsService: NotificationsService,
        private _progressBarService: ProgressBarService
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadLocations();
        });
    }
    ngOnInit() {
        this.loadLocations();
    }

    loadLocations() {
        this._progressBarService.show();
        this._locationsStore.getLocations()
            .subscribe(
            (data) => {
                this.locations = data;
            },
            (error) => {
                this.locations = [];
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', error.message);
                this._progressBarService.hide();
            },
            () => {
            this._progressBarService.hide();
            });
    }
}

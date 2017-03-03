import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { DoctorLocationSchedule } from '../../users/models/doctor-location-schedule';
import { DoctorLocationScheduleStore } from '../../users/stores/doctor-location-schedule-store';

@Component({
    selector: 'locations',
    templateUrl: './locations.html'
})


export class LocationsComponent implements OnInit {
    locations: DoctorLocationSchedule[];
    userId: number;
    constructor(
        public _route: ActivatedRoute,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _doctorLocationScheduleStore: DoctorLocationScheduleStore,
        public _sessionStore: SessionStore,
        private _notificationsService: NotificationsService,
        private _progressBarService: ProgressBarService
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadLocations();
        });
        this._route.parent.parent.params.subscribe((params: any) => {
            this.userId = parseInt(params.userId, 10);
        });
    }
    ngOnInit() {
        this.loadLocations();
    }

    loadLocations() {
        this._progressBarService.show();
        this._doctorLocationScheduleStore.getDoctorLocationScheduleByDoctorId(this.userId)
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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { UserLocationSchedule } from '../../users/models/user-location-schedule';
import { UserLocationScheduleStore } from '../../users/stores/user-location-schedule-store';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';


@Component({
    selector: 'locations',
    templateUrl: './locations.html'
})


export class LocationsComponent implements OnInit {
    locations: UserLocationSchedule[];
    selectedLocations: UserLocationSchedule[];
    userId: number;
    datasource: UserLocationSchedule[];
    totalRecords: number;
    isDeleteProgress:boolean = false;

    constructor(
        public _route: ActivatedRoute,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _userLocationScheduleStore: UserLocationScheduleStore,
        public _sessionStore: SessionStore,
        private _notificationsService: NotificationsService,
        private _progressBarService: ProgressBarService,
        private confirmationService: ConfirmationService,

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
        this._userLocationScheduleStore.getUserLocationScheduleByUserId(this.userId)
            .subscribe(
            (data) => {
                this.locations = data.reverse();
                // this.datasource = data.reverse();
                // this.totalRecords = this.datasource.length;
                // this.locations = this.datasource.slice(0, 10);
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
    
    loadLocationsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if(this.datasource) {
                this.locations = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

     deleteLocations() {
        if (this.selectedLocations !== undefined) {
             this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
            this.selectedLocations.forEach(currentLocation => {
                this.isDeleteProgress = true;
                this._progressBarService.show();
                let result;
                result = this._userLocationScheduleStore.deleteUserLocationSchedule(currentLocation);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Location deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadLocations();
                        this._notificationsStore.addNotification(notification);
                        this.selectedLocations = undefined;
                        // this.users.splice(this.users.indexOf(currentUser), 1);
                    },
                    (error) => {
                        let errString = 'Unable to delete location ';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._progressBarService.hide();
                        this.isDeleteProgress = false;
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this._progressBarService.hide();
                        this.isDeleteProgress = false;
                    });
            });
        }
             });
        }
        else {
            let notification = new Notification({
                'title': 'Select location to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select location to delete');
        }
    }
}

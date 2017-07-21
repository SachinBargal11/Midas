import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Room } from '../models/room';
import { RoomsStore } from '../stores/rooms-store';
import { RoomsService } from '../services/rooms-service';
import { LocationsStore } from '../../locations/stores/locations-store';
import { LocationDetails } from '../../locations/models/location-details';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';


@Component({
    selector: 'rooms',
    templateUrl: './rooms.html'
})

export class RoomsComponent implements OnInit {
    selectedRooms: Room[];
    rooms: Room[];
    locationDetails = new LocationDetails({});
    locationId: number;
    datasource: Room[];
    totalRecords: number;
    isDeleteProgress: boolean = false;
    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _roomsStore: RoomsStore,
        private _locationsStore: LocationsStore,
        private _notificationsStore: NotificationsStore,
        private _roomsService: RoomsService,
        private _notificationsService: NotificationsService,
        private _progressBarService: ProgressBarService,
        private confirmationService: ConfirmationService,
    ) {
        this._route.parent.parent.params.subscribe((params: any) => {
            this.locationId = parseInt(params.locationId);
        });

    }

    ngOnInit() {
        this.loadRooms();
    }

    loadRooms() {
        this._progressBarService.show();
        this._roomsStore.getRooms(this.locationId)
            .subscribe(rooms => {
                this.rooms = rooms.reverse();
                // this.datasource = rooms.reverse();
                // this.totalRecords = this.datasource.length;
                // this.rooms = this.datasource.slice(0, 10);
            },
            (error) => {
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Error!', error.message);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadRoomsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if(this.datasource) {
                this.rooms = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteRooms() {
        if (this.selectedRooms !== undefined) {
            this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
            this.selectedRooms.forEach(currentRoom => {
                this.isDeleteProgress = true;
                this._progressBarService.show();
                let result;
                result = this._roomsStore.deleteRoom(currentRoom);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Room ' + currentRoom.name + ' deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadRooms();
                        this._notificationsStore.addNotification(notification);
                        this.selectedRooms = undefined;
                    },
                    (error) => {
                        let errString = 'Unable ' + currentRoom.name + ' to delete room!';
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
                        this.isDeleteProgress = false;
                        this._progressBarService.hide();
                    });
            });
            }
            });
        }
        else {
            let notification = new Notification({
                'title': 'Select rooms to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Error!', 'Select rooms to delete');
        }
    }
}
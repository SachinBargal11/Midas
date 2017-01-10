import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidators } from '../../../utils/AppValidators';
import { ErrorMessageFormatter } from '../../../utils/ErrorMessageFormatter';
import { RoomsStore } from '../../../stores/rooms-store';
import { RoomsService } from '../../../services/rooms-service';
import { Room } from '../../../models/room';
import { Tests } from '../../../models/tests';
import { LocationsStore } from '../../../stores/locations-store';
import { LocationDetails } from '../../../models/location-details';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';
import moment from 'moment';
import { ProgressBarService } from '../../../services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'edit-room',
    templateUrl: 'templates/pages/rooms/edit-room.html'
})

export class EditRoomComponent implements OnInit {
    tests: Tests[];
    locationDetails = new LocationDetails({});
    room = new Room({});
    test = new Tests({});
    roomJS;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    editroomform: FormGroup;
    editroomformControls;
    isSaveProgress = false;

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _roomsStore: RoomsStore,
        private _roomsService: RoomsService,
        private _locationsStore: LocationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let roomId: number = parseInt(routeParams.id);
            this._progressBarService.show();
            let result = this._roomsStore.fetchRoomById(roomId);
            result.subscribe(
                (room: Room) => {
                    this.room = room;
                    this.test = room.roomTest;
                    this.roomJS = this.room.toJS();
                },
                (error) => {
                    // this._router.navigate(['/rooms']);
                    this.location.back();
                    this._progressBarService.hide();
                },
                () => {
                     this._progressBarService.hide();
                });
        });
        this.editroomform = this.fb.group({
            name: ['', Validators.required],
            contactPersonName: ['', Validators.required],
            phone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            tests: ['', Validators.required]
        });

        this.editroomformControls = this.editroomform.controls;
    }

    ngOnInit() {
        this._roomsService.getTests()
            .subscribe(tests => { this.tests = tests; });
    }

    goBack(): void {
        this.location.back();
    }

    update() {
        let editroomformValues = this.editroomform.value;
        let roomDetail = new Room({
            id: this.room.id,
            name: editroomformValues.name,
            contactPersonName: editroomformValues.contactPersonName,
            phone: editroomformValues.phone ? editroomformValues.phone.replace(/\-/g, '') : null,
            roomTest: {
                id: editroomformValues.tests
            },
            location: {
                id: this.room.location.id
            }
        });
        this._progressBarService.show();
        this.isSaveProgress = true;
        let result;

        result = this._roomsStore.updateRoom(roomDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Room updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                // this._router.navigate(['rooms']);
                this.location.back();
            },
            (error) => {
                let errString = 'Unable to update room.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });

    }

}

import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { RoomsStore } from '../stores/rooms-store';
import { RoomsService } from '../services/rooms-service';
import { Room } from '../models/room';
import { Tests } from '../models/tests';
import { LocationsStore } from '../../locations/stores/locations-store';
import { LocationDetails } from '../../locations/models/location-details';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'add-room',
    templateUrl: './add-room.html'
})

export class AddRoomComponent implements OnInit {
    tests: Tests[];
    locationDetails = new LocationDetails({});
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    addroomform: FormGroup;
    addroomformControls;
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
        this._route.parent.parent.params.subscribe((params: any) => {
            let locationId = parseInt(params.locationId);
            this._progressBarService.show();
            let result = this._locationsStore.fetchLocationById(locationId);
            result.subscribe(
                (locationDetails: LocationDetails) => {
                    this.locationDetails = locationDetails;
                },
                (error) => {
                    this._router.navigate(['/medical-provider/locations']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
        this.addroomform = this.fb.group({
            name: ['', Validators.required],
            contactPersonName: ['', Validators.required],
            phone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            tests: ['', Validators.required]
        });

        this.addroomformControls = this.addroomform.controls;
    }

    ngOnInit() {
        this._roomsService.getTests()
            .subscribe(tests => { this.tests = tests; });
    }

    save() {
        let addroomformValues = this.addroomform.value;
        let roomDetail = new Room({
            name: addroomformValues.name,
            contactPersonName: addroomformValues.contactPersonName,
            phone: addroomformValues.phone ? addroomformValues.phone.replace(/\-/g, '') : null,
            roomTest: {
                id: addroomformValues.tests
            },
            location: {
                id: this.locationDetails.location.id
            },
            schedule: {
                id: this.locationDetails.schedule.id
            }
        });
        this._progressBarService.show();
        this.isSaveProgress = true;
        let result;

        result = this._roomsStore.addRoom(roomDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Room added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add room.';
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

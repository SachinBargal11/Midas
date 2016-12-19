import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidators } from '../../../utils/AppValidators';
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

@Component({
    selector: 'add-room',
    templateUrl: 'templates/pages/rooms/add-room.html',
    providers: [FormBuilder],
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
        private _elRef: ElementRef
    ) {
        this._route.parent.params.subscribe((params: any) => {
            let locationId = parseInt(params.locationId);
            let result = this._locationsStore.fetchLocationById(locationId);
            result.subscribe(
                (locationDetails: LocationDetails) => {
                    this.locationDetails = locationDetails;
                },
                (error) => {
                    this._router.navigate(['/medical-provider/locations']);
                },
                () => {
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

    goBack(): void {
        this.location.back();
    }

    save() {
        let addroomformValues = this.addroomform.value;
        let roomDetail = new Room({
            name: addroomformValues.name,
            contactPersonName: addroomformValues.contactPersonName,
            phone: addroomformValues.phone,
            roomTest: {
                id: addroomformValues.tests
            },
            location: {
                id: this.locationDetails.location.id
            }
        });
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
                // this._router.navigate(['/rooms']);
                this.location.back();
            },
            (error) => {
                let errorBody = JSON.parse(error._body);
                let errorString = 'Unable to add Room.';
                if (errorBody.errorLevel === 2) {
                    if (errorBody.errorMessage) {
                        errorString = errorBody.errorMessage;
                    }
                } else {
                    // errorString = errorBody.errorMessage;
                    errorString = 'Unable to add Room.';
                }
                let notification = new Notification({
                    'title': errorString,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveProgress = false;
            });

    }

}

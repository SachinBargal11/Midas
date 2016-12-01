import {Component, OnInit, ElementRef} from '@angular/core';
import { Location } from '@angular/common';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {RoomsStore} from '../../../stores/rooms-store';
import {Room} from '../../../models/room';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';

@Component({
    selector: 'add-room',
    templateUrl: 'templates/pages/rooms/add-room.html',
    providers: [FormBuilder],
})

export class AddRoomComponent implements OnInit {
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
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            console.log(routeParams.locationName);
        });
        this.addroomform = this.fb.group({
                name: ['', Validators.required],
                phone: ['', Validators.required],
                testsProvided: ['', Validators.required]
            });

        this.addroomformControls = this.addroomform.controls;
    }

    ngOnInit() {
    }

    goBack(): void {
        this.location.back();
    }

    save() {
        let addroomformValues = this.addroomform.value;
        let roomDetail = new Room({
                name: addroomformValues.name,
                phone: addroomformValues.phone,
                testsProvided: addroomformValues.testsProvided
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
                let notification = new Notification({
                    'title': 'Unable to add Room.',
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

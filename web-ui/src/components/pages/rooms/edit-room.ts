import {Component, OnInit, ElementRef} from '@angular/core';
import { Location } from '@angular/common';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {RoomsStore} from '../../../stores/rooms-store';
import { RoomsService } from '../../../services/rooms-service';
import {Room} from '../../../models/room';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';

@Component({
    selector: 'edit-room',
    templateUrl: 'templates/pages/rooms/edit-room.html',
    providers: [FormBuilder],
})

export class EditRoomComponent implements OnInit {
    room = new Room({});
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
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let roomId: number = parseInt(routeParams.id);
            let result = this._roomsStore.fetchRoomById(roomId);
            result.subscribe(
                (room: Room) => {
                    this.room = room;
                },
                (error) => {
                    // this._router.navigate(['/rooms']);
                    this.location.back();
                },
                () => {
                });
        });
        this.editroomform = this.fb.group({
                name: ['', Validators.required],
                phone: ['', Validators.required],
                testsProvided: ['', Validators.required]
            });

        this.editroomformControls = this.editroomform.controls;
    }

    ngOnInit() {
    }

    goBack(): void {
        this.location.back();
    }

    update() {
        let editroomformValues = this.editroomform.value;
        let roomDetail = new Room({
            id: this.room.id,
            name: editroomformValues.name,
            phone: editroomformValues.phone,
            testsProvided: editroomformValues.testsProvided
        });
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
                let notification = new Notification({
                    'title': 'Unable to update Room.',
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

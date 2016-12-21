import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from '../../../models/room';
import { RoomsStore } from '../../../stores/rooms-store';
import { RoomsService } from '../../../services/rooms-service';
import { LocationsStore } from '../../../stores/locations-store';
import { LocationDetails } from '../../../models/location-details';
import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';
import moment from 'moment';

@Component({
    selector: 'rooms',
    templateUrl: 'templates/pages/rooms/rooms.html'
})

export class RoomsComponent implements OnInit {
    selectedRooms: Room[];
    rooms: Room[];
    locationDetails = new LocationDetails({});
    locationId: number;
    roomsLoading;
    isDeleteProgress = false;
    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _roomsStore: RoomsStore,
        private _locationsStore: LocationsStore,
        private _notificationsStore: NotificationsStore,
        private _roomsService: RoomsService
    ) {
        this._route.parent.params.subscribe((params: any) => {
            this.locationId = parseInt(params.locationId);
        });

    }

    ngOnInit() {
        this.loadRooms();
    }

    loadRooms() {
        this.roomsLoading = true;
        this._roomsStore.getRooms(this.locationId)
            .subscribe(rooms => {
                this.rooms = rooms;
            },
            (error) => {
                this.roomsLoading = false;
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.roomsLoading = false;
            });
    }
    deleteRooms() {
        if (this.selectedRooms !== undefined) {
            this.selectedRooms.forEach(room => {
                let roomDetail = new Room({
                    id: room.id,
                    name: room.name,
                    contactPersonName: room.contactPersonName,
                    phone: room.phone,
                    isDeleted: 1,
                    roomTest: {
                        id: room.roomTest.id
                    },
                    location: {
                        id: room.location.id
                    }
                });
                this.isDeleteProgress = true;
                let result;

                result = this._roomsStore.deleteRoom(roomDetail);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Room ' + room.name + ' deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.rooms.splice(this.rooms.indexOf(room), 1);
                        this._notificationsStore.addNotification(notification);
                        console.log(this._roomsStore.rooms);
                    },
                    (error) => {
                        let notification = new Notification({
                            'title': 'Unable ' + room.name + ' to delete room!',
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                    },
                    () => {
                        this.isDeleteProgress = false;
                    });
            });
        }
        else {
            let notification = new Notification({
                'title': 'select rooms to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
        }
    }

    findSelectedRoomIndex(room): number {
        return this.rooms.indexOf(room);
    }

}
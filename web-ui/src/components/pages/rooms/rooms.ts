import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Room} from '../../../models/room';
import {RoomsStore} from '../../../stores/rooms-store';

@Component({
    selector: 'rooms',
    templateUrl: 'templates/pages/rooms/rooms.html'
})

export class RoomsComponent implements OnInit {
    rooms: Room[];
    roomsLoading;
    constructor(
        private _router: Router,
        private _roomsStore: RoomsStore
        ) {

    }

    ngOnInit() {
        this.loadRooms();
    }

    loadRooms() {
        this.roomsLoading = true;
        this._roomsStore.getRooms()
            .subscribe(rooms => {
                this.rooms = rooms;
            },
            null,
            () => {
                this.roomsLoading = false;
            });
    }
    onRowSelect(room) {
        // this._router.navigate(['/medicalProvider/rooms/' + room + '/edit']);
    }

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Room} from '../../../models/room';
import {RoomsStore} from '../../../stores/rooms-store';
import { RoomsService } from '../../../services/rooms-service';

@Component({
    selector: 'rooms',
    templateUrl: 'templates/pages/rooms/rooms.html'
})

export class RoomsComponent implements OnInit {
    selectedRooms: Room[];
    rooms: Room[];
    roomsLoading;
    constructor(
        private _router: Router,
        private _roomsStore: RoomsStore,
        private _roomsService: RoomsService
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
    deleteRooms() {
        if(this.selectedRooms !== undefined) {
            this.selectedRooms.forEach(room => {
                this._roomsStore.deleteRoom(room)
                    .subscribe(rooms => { 
                            this.rooms.splice(this.rooms.indexOf(room), 1);
                    });
            });
        }
        else {
            console.log('select rooms first to delete');
        }
    }
    
    findSelectedRoomIndex(room): number {
        return this.rooms.indexOf(room);
    }

}
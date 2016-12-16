import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Room} from '../../../models/room';
import {RoomsStore} from '../../../stores/rooms-store';
import { RoomsService } from '../../../services/rooms-service';
import {LocationsStore} from '../../../stores/locations-store';
import {LocationDetails} from '../../../models/location-details';

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
    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _roomsStore: RoomsStore,
        private _locationsStore: LocationsStore,
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
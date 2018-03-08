import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { RoomsStore } from '../stores/rooms-store';
import { RoomsService } from '../services/rooms-service';
import { Room } from '../models/room';

@Component({
    selector: 'rooms-shell',
    templateUrl: './rooms-shell.html'
})

export class RoomsShellComponent implements OnInit {

    test: boolean = true;
    room = new Room({});
    roomName:string;

    constructor(
        public router: Router,
        public _route: ActivatedRoute,
        private _sessionStore: SessionStore,
        private _roomsStore: RoomsStore
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let roomId: number = parseInt(routeParams.roomId);
            let result = this._roomsStore.fetchRoomById(roomId);
            result.subscribe(
                (room: Room) => {
                    this.room = room;
                    this.roomName = room.name;
                },
                (error) => {
                    // this._router.navigate(['/rooms']);
                })
        });

    }

    ngOnInit() {
    
        this._route.params.subscribe((routeParams: any) => {
            console.log(routeParams);
        });
    }

}
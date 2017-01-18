import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Room } from '../models/room';
import { Tests } from '../models/tests';
import { RoomsService } from '../services/rooms-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class RoomsStore {

    private _rooms: BehaviorSubject<List<Room>> = new BehaviorSubject(List([]));
    private _tests: BehaviorSubject<List<Tests>> = new BehaviorSubject(List([]));

    constructor(
        private _roomsService: RoomsService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get rooms() {
        return this._rooms.asObservable();
    }

    get tests() {
        return this._tests.asObservable();
    }

    getRooms(locationId: number): Observable<Room[]> {
        let promise = new Promise((resolve, reject) => {
            this._roomsService.getRooms(locationId).subscribe((rooms: Room[]) => {
                this._rooms.next(List(rooms));
                resolve(rooms);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Room[]>>Observable.fromPromise(promise);
    }
    getTests(): Observable<Tests[]> {
        let promise = new Promise((resolve, reject) => {
            this._roomsService.getTests().subscribe((tests: Tests[]) => {
                this._tests.next(List(tests));
                resolve(tests);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Tests[]>>Observable.fromPromise(promise);
    }

      findRoomById(id: number) {
        let rooms = this._rooms.getValue();
        let index = rooms.findIndex((currentRoom: Room) => currentRoom.id === id);
        return rooms.get(index);
    }

    fetchRoomById(id: number): Observable<Room> {
        let promise = new Promise((resolve, reject) => {
            let matchedRoom: Room = this.findRoomById(id);
            if (matchedRoom) {
                resolve(matchedRoom);
            } else {
                this._roomsService.getRoom(id)
                .subscribe((room: Room) => {
                    resolve(room);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Room>>Observable.fromPromise(promise);
    }
    addRoom(roomDetail: Room): Observable<Room> {
        let promise = new Promise((resolve, reject) => {
            this._roomsService.addRoom(roomDetail).subscribe((room: Room) => {
                this._rooms.next(this._rooms.getValue().push(room));
                resolve(room);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Room>>Observable.from(promise);
    }
    updateRoom(roomDetail: Room): Observable<Room> {
        let promise = new Promise((resolve, reject) => {
            this._roomsService.updateRoom(roomDetail).subscribe((updatedRoom: Room) => {
                let roomDetails: List<Room> = this._rooms.getValue();
                let index = roomDetails.findIndex((currentRoom: Room) => currentRoom.id === updatedRoom.id);
                roomDetails = roomDetails.update(index, function () {
                    return updatedRoom;
                });
                this._rooms.next(roomDetails);
                resolve(roomDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Room>>Observable.from(promise);
    }
    deleteRoom(room: Room) {
        let rooms = this._rooms.getValue();
        let index = rooms.findIndex((currentRoom: Room) => currentRoom.id === room.id);
        let promise = new Promise((resolve, reject) => {
            this._roomsService.deleteRoom(room)
            .subscribe((room: Room) => {
                this._rooms.next(rooms.delete(index));
                resolve(room);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Room>>Observable.from(promise);
    }

    resetStore() {
        this._rooms.next(this._rooms.getValue().clear());
        this._tests.next(this._tests.getValue().clear());
    }

}
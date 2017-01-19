import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/environment';
import { Room } from '../models/room';
import { Tests } from '../models/tests';
import { RoomsAdapter } from './adapters/rooms-adapter';
import { TestsAdapter } from './adapters/tests-adapter';

@Injectable()
export class RoomsService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/rooms';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getRoom(roomId: Number): Observable<Room> {
        let promise: Promise<Room> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Room/Get/' + roomId).map(res => res.json())
                .subscribe((roomData: any) => {
                    let parsedData: Room = null;
                    parsedData = RoomsAdapter.parseResponse(roomData);
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Room>>Observable.fromPromise(promise);
    }
    getRooms(locationId: number): Observable<Room[]> {
        let promise: Promise<Room[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/Room/GetAll', JSON.stringify({ location: { id: locationId } }), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((roomsData: any) => {
                    let rooms: any[] = [];
                    if (_.isArray(roomsData)) {
                        rooms = (<Object[]>roomsData).map((roomsData: any) => {
                            return RoomsAdapter.parseResponse(roomsData);
                        });
                    }
                    resolve(rooms);

                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Room[]>>Observable.fromPromise(promise);
    }
    getTests(): Observable<Tests[]> {
        let promise: Promise<Tests[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/RoomTest/GetAll', JSON.stringify({}), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((testsData: Array<Object>) => {
                    let tests: any[] = (<Object[]>testsData).map((testsData: any) => {
                        return TestsAdapter.parseResponse(testsData);
                    });
                    resolve(tests);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Tests[]>>Observable.fromPromise(promise);
    }
    addRoom(roomDetail: Room): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let requestData: any = roomDetail.toJS();
            requestData.contactersonName = requestData.contactPersonName;
            requestData = _.omit(requestData, 'contactPersonName');
            return this._http.post(this._url + '/Room/Add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((roomsData: any) => {
                    let parsedRoom: Room = null;
                    parsedRoom = RoomsAdapter.parseResponse(roomsData);
                    resolve(parsedRoom);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    updateRoom(roomDetail: Room): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let requestData: any = roomDetail.toJS();
            requestData.contactersonName = requestData.contactPersonName;
            requestData = _.omit(requestData, 'contactPersonName');
            return this._http.post(this._url + '/Room/Add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((roomsData: any) => {
                    let parsedRoom: Room = null;
                    parsedRoom = RoomsAdapter.parseResponse(roomsData);
                    resolve(parsedRoom);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    deleteRoom(roomDetail: Room): Observable<Room> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let requestData: any = roomDetail.toJS();
            requestData.isDeleted = 1,
                requestData.contactersonName = requestData.contactPersonName;
            requestData = _.omit(requestData, 'contactPersonName');
            return this._http.post(this._url + '/Room/Add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((roomsData: any) => {
                    let parsedRoom: Room = null;
                    parsedRoom = RoomsAdapter.parseResponse(roomsData);
                    resolve(parsedRoom);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    // deleteRoom(room: Room): Observable<Room> {
    //     let promise = new Promise((resolve, reject) => {
    //         return this._http.delete(`${this._url}/${room.id}`)
    //             .map(res => res.json())
    //             .subscribe((room) => {
    //                 resolve(room);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<Room>>Observable.from(promise);
    // }

}


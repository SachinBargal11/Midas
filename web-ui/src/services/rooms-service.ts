import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {Room} from '../models/room';

@Injectable()
export class RoomsService {

    // private _url: string = `${Environment.SERVICE_BASE_URL}`;
    private _url: string = 'http://localhost:3004/rooms';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getRoom(roomId: Number): Observable<Room> {
        let promise: Promise<Room> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '?id=' + roomId).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    let room = null;
                    if (data.length) {
                        // room = roomAdapter.parseResponse(data[0]);
                        resolve(room);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Room>>Observable.fromPromise(promise);
    }
    getRooms(): Observable<Room[]> {
        let promise: Promise<Room[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url).map(res => res.json())
                .subscribe((data) => {
                 resolve(data);
             }, (error) => {
                 reject(error);
            });
        });
        return <Observable<Room[]>>Observable.fromPromise(promise);
    }
    addRoom(roomDetail: Room): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return this._http.post(this._url, JSON.stringify(roomDetail), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    updateRoom(roomDetail: Room): Observable<Room> {
        let promise = new Promise((resolve, reject) => {
            return this._http.put(`${this._url}/${roomDetail.id}`, JSON.stringify(roomDetail), {
                headers: this._headers
            })
            .map(res => res.json())
            .subscribe((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<Room>>Observable.fromPromise(promise);

    }

}


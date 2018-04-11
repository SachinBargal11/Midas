import { Schedule } from '../models/schedule';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { MyEvent } from '../models/my-event';

@Injectable()
export class EventService {
    private _url: string = 'http://localhost:3004/data';
    private _headers: Headers = new Headers();

    constructor(private _http: Http, private _sessionStore: SessionStore) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }
    getEvent(eventId: Number): Observable<MyEvent> {
        let promise: Promise<MyEvent> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '?id=' + eventId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    if (data.length) {
                        resolve(data);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<MyEvent>>Observable.fromPromise(promise);
    }

    getEvents(): Observable<MyEvent[]> {
        let promise: Promise<MyEvent[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<MyEvent[]>>Observable.fromPromise(promise);
    }
    addEvent(event: MyEvent): Observable<MyEvent> {
        let promise: Promise<MyEvent> = new Promise((resolve, reject) => {
            return this._http.post(this._url, JSON.stringify(event), {
                headers: this._headers
            })
            .map(res => res.json())
            .subscribe((data: any) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<MyEvent>>Observable.fromPromise(promise);
    }
    updateEvent(event: MyEvent): Observable<MyEvent> {
        let promise = new Promise((resolve, reject) => {
            return this._http.put(`${this._url}/${event.id}`, JSON.stringify(event), {
                headers: this._headers
            })
            .map(res => res.json())
            .subscribe((data: any) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<MyEvent>>Observable.fromPromise(promise);
    }
    deleteEvent(event: MyEvent): Observable<MyEvent> {
        let promise = new Promise((resolve, reject) => {
            return this._http.delete(`${this._url}/${event.id}`, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<MyEvent>>Observable.from(promise);
    }
}

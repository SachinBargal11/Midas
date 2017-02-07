import { Accident } from '../models/accident';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';


@Injectable()
export class AccidentService {
    private _url: string = 'http://localhost:3004/accidentInfo';
    private _headers: Headers = new Headers();

    constructor(private _http: Http) {
        this._headers.append('Content-Type', 'application/json');
    }
    getAccident(accidentId: Number): Observable<Accident> {
        let promise: Promise<Accident> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '?id=' + accidentId).map(res => res.json())
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
        return <Observable<Accident>>Observable.fromPromise(promise);
    }

    getAccidents(): Observable<Accident[]> {
        let promise: Promise<Accident[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Accident[]>>Observable.fromPromise(promise);
    }
    addAccident(accident: Accident): Observable<Accident> {
        let promise: Promise<Accident> = new Promise((resolve, reject) => {
            return this._http.post(this._url, JSON.stringify(accident), {
                headers: this._headers
            })
            .map(res => res.json())
            .subscribe((data: any) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<Accident>>Observable.fromPromise(promise);
    }
    updateAccident(accident: Accident): Observable<Accident> {
        let promise = new Promise((resolve, reject) => {
            return this._http.put(`${this._url}/${accident.id}`, JSON.stringify(accident), {
                headers: this._headers
            })
            .map(res => res.json())
            .subscribe((data: any) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<Accident>>Observable.fromPromise(promise);
    }
    deleteAccident(accident: Accident): Observable<Accident> {
        let promise = new Promise((resolve, reject) => {
            return this._http.delete(`${this._url}/${accident.id}`)
                .map(res => res.json())
                .subscribe((accident:Accident) => {
                    resolve(accident);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Accident>>Observable.from(promise);
    }
}

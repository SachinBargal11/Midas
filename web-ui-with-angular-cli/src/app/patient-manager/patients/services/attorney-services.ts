import { Attorney } from '../models/attorney';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';


@Injectable()
export class AttorneyService {
    private _url: string = 'http://localhost:3004/attorney';
    private _headers: Headers = new Headers();

    constructor(private _http: Http) {
        this._headers.append('Content-Type', 'application/json');
    }
    getAttorney(attorneyId: Number): Observable<Attorney> {
        let promise: Promise<Attorney> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '?id=' + attorneyId).map(res => res.json())
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
        return <Observable<Attorney>>Observable.fromPromise(promise);
    }

    getAttorneys(): Observable<Attorney[]> {
        let promise: Promise<Attorney[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Attorney[]>>Observable.fromPromise(promise);
    }
    addAttorney(attorney: Attorney): Observable<Attorney> {
        let promise: Promise<Attorney> = new Promise((resolve, reject) => {
            return this._http.post(this._url, JSON.stringify(attorney), {
                headers: this._headers
            })
            .map(res => res.json())
            .subscribe((data: any) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<Attorney>>Observable.fromPromise(promise);
    }
    updateAttorney(attorney: Attorney): Observable<Attorney> {
        let promise = new Promise((resolve, reject) => {
            return this._http.put(`${this._url}/${attorney.id}`, JSON.stringify(attorney), {
                headers: this._headers
            })
            .map(res => res.json())
            .subscribe((data: any) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<Attorney>>Observable.fromPromise(promise);
    }
    deleteAttorney(attorney: Attorney): Observable<Attorney> {
        let promise = new Promise((resolve, reject) => {
            return this._http.delete(`${this._url}/${attorney.id}`)
                .map(res => res.json())
                .subscribe((attorney:Attorney) => {
                    resolve(attorney);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Attorney>>Observable.from(promise);
    }
}

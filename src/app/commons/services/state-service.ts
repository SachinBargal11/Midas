import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import {States} from '../models/states';
import {Cities} from '../models/cities';
import { SessionStore } from '../../commons/stores/session-store';

@Injectable()
export class StateService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getStates(): Observable<States[]> {
        let promise: Promise<States[]> = new Promise((resolve, reject) => {
        return this._http.get(environment.SERVICE_BASE_URL + '/common/getstates', {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<States[]>>Observable.fromPromise(promise);
    }
    getStatesByCities(cityName: string): Observable<States[]> {
        let promise: Promise<States[]> = new Promise((resolve, reject) => {
        return this._http.get(environment.SERVICE_BASE_URL + '/common/getstatesbycity/' + cityName, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<States[]>>Observable.fromPromise(promise);
    }
    getCitiesByStates(stateName: string): Observable<Cities[]> {
        let promise: Promise<Cities[]> = new Promise((resolve, reject) => {
        return this._http.get(environment.SERVICE_BASE_URL + '/common/getcitiesbystates/' + stateName, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Cities[]>>Observable.fromPromise(promise);
    }
    getCities(): Observable<Cities[]> {
        let promise: Promise<Cities[]> = new Promise((resolve, reject) => {
        return this._http.get(environment.SERVICE_BASE_URL + '/common/getcities', {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Cities[]>>Observable.fromPromise(promise);
    }
}

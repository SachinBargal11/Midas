import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import {States} from '../models/states';
import {Cities} from '../models/cities';
import { SessionStore } from '../stores/session-store';

@Injectable()
export class StateService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        public sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this.sessionStore.session.accessToken);
    }

    getStates(): Observable<States[]> {
        let promise: Promise<States[]> = new Promise((resolve, reject) => {
        return this._http.get(environment.SERVICE_BASE_URL + '/common/getstates').map(res => res.json())
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
        return this._http.get(environment.SERVICE_BASE_URL + '/common/getstatesbycity/' + cityName).map(res => res.json())
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
        return this._http.get(environment.SERVICE_BASE_URL + '/common/getcitiesbystates/' + stateName).map(res => res.json())
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
        return this._http.get(environment.SERVICE_BASE_URL + '/common/getcities').map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Cities[]>>Observable.fromPromise(promise);
    }
}

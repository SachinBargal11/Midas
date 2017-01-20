import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../../scripts/environment';
import {States} from '../models/states';
import {Cities} from '../models/cities';

@Injectable()
export class StateService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;

    constructor(
        private _http: Http
    ) {

    }

    getStates(): Observable<States[]> {
        let promise: Promise<States[]> = new Promise((resolve, reject) => {
        return this._http.get(this._url + '/common/getstates').map(res => res.json())
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
        return this._http.get(this._url + '/common/getstatesbycity/' + cityName).map(res => res.json())
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
        return this._http.get(this._url + '/common/getcitiesbystates/' + stateName).map(res => res.json())
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
        return this._http.get(this._url + '/common/getcities').map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Cities[]>>Observable.fromPromise(promise);
    }
}

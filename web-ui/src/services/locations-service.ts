import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {Location} from '../models/location';

@Injectable()
export class LocationsService {

    // private _url: string = `${Environment.SERVICE_BASE_URL}`;
    private _url: string = 'http://localhost:3004/locations';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getLocations(): Observable<Location[]> {
        let promise: Promise<Location[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url).map(res => res.json())
                .subscribe((data) => {
                 resolve(data);
             }, (error) => {
                 reject(error);
            });
        });
        return <Observable<Location[]>>Observable.fromPromise(promise);
    }
    addLocation(location: Location): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = location.toJS();
            requestData.contactInfo = requestData.contact;
            requestData = _.omit(requestData, 'contact');
            console.log(requestData);
            return this._http.post(this._url, JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

}


import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {Location} from '../models/location';
import {LocationDetails} from '../models/location-details';

@Injectable()
export class LocationsService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/locations';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    // getLocation(id: Number): Observable<LocationDetails> {
    //     let promise: Promise<LocationDetails> = new Promise((resolve, reject) => {
    //         return this._http.get(this._url + '/Location/get/' + id).map(res => res.json())
    //             .subscribe((data: Array<any>) => {
    //                 let patient = null;
    //                 if (data.length) {
    //                     patient = PatientAdapter.parseResponse(data[0]);
    //                     resolve(patient);
    //                 } else {
    //                     reject(new Error('NOT_FOUND'));
    //                 }
    //             }, (error) => {
    //                 reject(error);
    //             });

    //     });
    //     return <Observable<Patient>>Observable.fromPromise(promise);
    // }

    getLocations(): Observable<LocationDetails[]> {
        let promise: Promise<LocationDetails[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/Location/getall', JSON.stringify({	"company": {"id":16}}), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                 resolve(data);
             }, (error) => {
                 reject(error);
            });
        });
        return <Observable<LocationDetails[]>>Observable.fromPromise(promise);
    }
    addLocation(location: LocationDetails): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = location.toJS();
            requestData.contactInfo = requestData.contact;
            requestData.addressInfo = requestData.address;
            requestData = _.omit(requestData, 'contact');
            requestData = _.omit(requestData, 'address');
            console.log(requestData);
            return this._http.post(this._url + '/Location/add', JSON.stringify(requestData), {
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


import { Schedule } from '../models/schedule';
import { SessionStore } from '../stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import { Location } from '../models/location';
import { LocationDetails } from '../models/location-details';
import { LocationDetailAdapter } from './adapters/location-detail-adapter';

@Injectable()
export class LocationsService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/locations';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getLocation(id: Number): Observable<LocationDetails> {
        let promise: Promise<LocationDetails> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Location/get/' + id).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedLocation: LocationDetails = null;
                    parsedLocation = LocationDetailAdapter.parseResponse(data);
                    resolve(parsedLocation);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<LocationDetails>>Observable.fromPromise(promise);
    }

    getLocations(): Observable<any[]> {
        let requestData = {
            company: {
                id: this._sessionStore.session.company.id
            }
        };
        let promise: Promise<any[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/Location/getall', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let locations: any[] = (<Object[]>data).map((data: any) => {
                        return LocationDetailAdapter.parseResponse(data);
                    });
                    resolve(locations);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }
    addLocation(location: LocationDetails): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = location.toJS();
            requestData.contactInfo = requestData.contact;
            requestData.addressInfo = requestData.address;
            requestData = _.omit(requestData, 'contact');
            requestData = _.omit(requestData, 'address');
            requestData.company = _.omit(requestData.company, 'taxId', 'companyType', 'name');
            console.log(requestData);
            return this._http.post(this._url + '/Location/add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                let parsedLocation: LocationDetails = null;
                parsedLocation = LocationDetailAdapter.parseResponse(data);
                resolve(parsedLocation);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    updateLocation(location: LocationDetails): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = location.toJS();
            requestData.contactInfo = requestData.contact;
            requestData.addressInfo = requestData.address;
            requestData = _.omit(requestData, 'contact');
            requestData = _.omit(requestData, 'address');
            console.log(requestData);
            return this._http.post(this._url + '/Location/add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                let parsedLocation: LocationDetails = null;
                parsedLocation = LocationDetailAdapter.parseResponse(data);
                resolve(parsedLocation);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    updateScheduleForLocation(location: LocationDetails, schedule: Schedule): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = location.toJS();
            requestData.schedule = {
                id: schedule.id
            };
            requestData = _.omit(requestData, 'company', 'contact', 'address');
            return this._http.post(this._url + '/Location/add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                let parsedLocation: LocationDetails = null;
                parsedLocation = LocationDetailAdapter.parseResponse(data);
                resolve(parsedLocation);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

}


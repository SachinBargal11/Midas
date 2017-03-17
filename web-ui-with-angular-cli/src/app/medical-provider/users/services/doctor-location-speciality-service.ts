import { location } from '@angular/platform-browser/src/facade/browser';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { DoctorLocationSpeciality } from '../models/doctor-location-speciality';
import { Speciality } from '../../../account-setup/models/speciality';
import { DoctorLocationSpecialityAdapter } from './adapters/doctor-location-speciality-adapter';
import { UsersStore } from '../stores/users-store';

@Injectable()
export class DoctorLocationSpecialityService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getDoctorLocationSpeciality(specialityId: Number): Observable<any> {
        let promise: Promise<DoctorLocationSpeciality> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DoctorLocationSpeciality/get/' + specialityId).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedData: DoctorLocationSpeciality = null;
                    parsedData = DoctorLocationSpecialityAdapter.parseResponse(data);
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<DoctorLocationSpeciality>>Observable.fromPromise(promise);
    }
    getDoctorLocationSpecialityByLocationId(locationId: Number): Observable<DoctorLocationSpeciality[]> {
        let promise: Promise<DoctorLocationSpeciality[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DoctorLocationSpeciality/GetByLocationId/' + locationId).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedData: DoctorLocationSpeciality[] = [];
                    if (_.isArray(data)) {
                        parsedData = (<Object[]>data).map((data: any) => {
                            return DoctorLocationSpecialityAdapter.parseResponse(data);
                        });
                    }
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<DoctorLocationSpeciality[]>>Observable.fromPromise(promise);
    }
    getDoctorLocationSpecialityByDoctorId(doctorId: Number): Observable<any> {
        let promise: Promise<DoctorLocationSpeciality[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DoctorLocationSpeciality/GetByDoctorId/' + doctorId).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedData: DoctorLocationSpeciality[];
                    if (data) {
                        parsedData = (<Object[]>data).map((data: any) => {
                            return DoctorLocationSpecialityAdapter.parseResponse(data);
                        });
                    }
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<DoctorLocationSpeciality[]>>Observable.fromPromise(promise);
    }
    getDoctorLocationSpecialityByDoctorIdAndLocationId(doctorId: Number, locationId: Number): Observable<any> {
        let promise: Promise<DoctorLocationSpeciality> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DoctorLocationSpeciality/GetByLocationAndDoctor/' + locationId + '/' + doctorId)
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedData: DoctorLocationSpeciality;
                    // let schedules: any[] = (<Object[]>data).map((data: any) => {
                    parsedData = DoctorLocationSpecialityAdapter.parseResponse(data[0]);
                    // });
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<DoctorLocationSpeciality>>Observable.fromPromise(promise);
    }

    // getDoctorLocationSpecialities(): Observable<DoctorLocationSpeciality[]> {
    //     let promise: Promise<DoctorLocationSpeciality[]> = new Promise((resolve, reject) => {
    //         return this._http.get(this._url + '/DoctorLocationSchedule/getall').map(res => res.json())
    //             .subscribe((schedulesData: Array<Object>) => {
    //                 let parsedData: any[] = (<Object[]>schedulesData).map((schedulesData: any) => {
    //                     return DoctorLocationSpecialityAdapter.parseResponse(schedulesData);
    //                 });
    //                 resolve(parsedData);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<DoctorLocationSpeciality[]>>Observable.fromPromise(promise);
    // }

    associateDoctorToLocations(doctorLocationSpeciality: DoctorLocationSpeciality[]): Observable<any[]> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {

            return this._http.post(this._url + '/DoctorLocationSpeciality/associateDoctorToLocations', JSON.stringify(doctorLocationSpeciality), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                    let parsedData: DoctorLocationSpeciality[];
                    if (data) {
                        parsedData = (<Object[]>data).map((data: any) => {
                            return DoctorLocationSpecialityAdapter.parseResponse(data);
                        });
                    }
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }
    associateLocationToDoctors(doctorLocationSpeciality: DoctorLocationSpeciality[]): Observable<any[]> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {

            return this._http.post(this._url + '/DoctorLocationSpeciality/associateLocationToDoctors', JSON.stringify(doctorLocationSpeciality), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                    let parsedData: DoctorLocationSpeciality[];
                    if (data) {
                        parsedData = (<Object[]>data).map((data: any) => {
                            return DoctorLocationSpecialityAdapter.parseResponse(data);
                        });
                    }
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }


    deleteDoctorLocationSSpeciality(doctorLocationSpeciality: DoctorLocationSpeciality): Observable<DoctorLocationSpeciality> {
        let promise = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/DoctorLocationSpeciality/Delete/' + doctorLocationSpeciality.id, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSpeciality>>Observable.from(promise);
    }


}


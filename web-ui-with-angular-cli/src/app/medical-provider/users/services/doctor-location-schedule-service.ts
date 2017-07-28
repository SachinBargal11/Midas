import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { DoctorLocationSchedule } from '../models/doctor-location-schedule';
import { Schedule } from '../../locations/models/schedule';
import { ScheduleDetail } from '../../locations/models/schedule-detail';
import { DoctorLocationScheduleAdapter } from './adapters/doctor-location-schedule-adapter';
import { UsersStore } from '../stores/users-store';

@Injectable()
export class DoctorLocationScheduleService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getDoctorLocationSchedule(scheduleId: Number): Observable<any> {
        let promise: Promise<DoctorLocationSchedule> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DoctorLocationSchedule/get/' + scheduleId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedData: DoctorLocationSchedule = null;
                    parsedData = DoctorLocationScheduleAdapter.parseResponse(data);
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<DoctorLocationSchedule>>Observable.fromPromise(promise);
    }
    getDoctorLocationScheduleByLocationId(locationId: Number): Observable<DoctorLocationSchedule[]> {
        let promise: Promise<DoctorLocationSchedule[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DoctorLocationSchedule/GetByLocationId/' + locationId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let schedules: DoctorLocationSchedule[] = [];
                    if (_.isArray(data)) {
                        schedules = (<Object[]>data).map((data: any) => {
                            return DoctorLocationScheduleAdapter.parseResponse(data);
                        });
                    }
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<DoctorLocationSchedule[]>>Observable.fromPromise(promise);
    }
    getDoctorLocationScheduleByDoctorId(doctorId: Number): Observable<any> {
        let promise: Promise<DoctorLocationSchedule[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DoctorLocationSchedule/GetByDoctorId/' + doctorId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let schedules: DoctorLocationSchedule[];
                    if (data) {
                        schedules = (<Object[]>data).map((data: any) => {
                            return DoctorLocationScheduleAdapter.parseResponse(data);
                        });
                    }
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<DoctorLocationSchedule[]>>Observable.fromPromise(promise);
    }

    getDoctorLocationScheduleByDoctorIdCompanyId(companyId:Number,doctorId: Number): Observable<any> {
        let promise: Promise<DoctorLocationSchedule[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DoctorLocationSchedule/getByDoctorAndCompanyId/' + doctorId + '/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let schedules: DoctorLocationSchedule[];
                    if (data) {
                        schedules = (<Object[]>data).map((data: any) => {
                            return DoctorLocationScheduleAdapter.parseResponse(data);
                        });
                    }
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<DoctorLocationSchedule[]>>Observable.fromPromise(promise);
    }
    
    getDoctorLocationScheduleByDoctorIdAndLocationId(doctorId: Number, locationId: Number): Observable<any> {
        let promise: Promise<DoctorLocationSchedule> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DoctorLocationSchedule/GetByLocationAndDoctor/' + locationId + '/' + doctorId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let schedule: DoctorLocationSchedule;
                    // let schedules: any[] = (<Object[]>data).map((data: any) => {
                    schedule = DoctorLocationScheduleAdapter.parseResponse(data[0]);
                    // });
                    resolve(schedule);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<DoctorLocationSchedule>>Observable.fromPromise(promise);
    }

    getDoctorLocationSchedules(): Observable<DoctorLocationSchedule[]> {
        let promise: Promise<DoctorLocationSchedule[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DoctorLocationSchedule/getall', {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((schedulesData: Array<Object>) => {
                    let schedules: any[] = (<Object[]>schedulesData).map((schedulesData: any) => {
                        return DoctorLocationScheduleAdapter.parseResponse(schedulesData);
                    });
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule[]>>Observable.fromPromise(promise);
    }

    addDoctorLocationSchedule(locationDetails: DoctorLocationSchedule): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let requestData: any = locationDetails.toJS();
            return this._http.post(this._url + '/DoctorLocationSchedule/add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((schedulesData: any) => {
                    let parsedSchedule: DoctorLocationSchedule = null;
                    parsedSchedule = DoctorLocationScheduleAdapter.parseResponse(schedulesData);
                    resolve(parsedSchedule);
                }, (error) => {
                    reject(error);
                });
        });

        return <Observable<any>>Observable.fromPromise(promise);
    }
    updateDoctorLocationSchedule(locationDetails: DoctorLocationSchedule): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let requestData: any = locationDetails.toJS();
            return this._http.post(this._url + '/DoctorLocationSchedule/add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((schedulesData: any) => {
                    let parsedSchedule: DoctorLocationSchedule = null;
                    parsedSchedule = DoctorLocationScheduleAdapter.parseResponse(schedulesData);
                    resolve(parsedSchedule);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    updateScheduleForLocation(doctorLocationSchedule: DoctorLocationSchedule, schedule: Schedule): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = doctorLocationSchedule.toJS();
            let locationId = requestData.location.location.id;
            requestData = _.omit(requestData, 'location');
            requestData = _.extend(requestData, {
                schedule: {
                    id: schedule.id
                },
                location: {
                    id: locationId
                }
            });

            return this._http.post(this._url + '/DoctorLocationSchedule/add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                let parsedLocation: DoctorLocationSchedule = null;
                parsedLocation = DoctorLocationScheduleAdapter.parseResponse(data);
                resolve(parsedLocation);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    associateDoctorsToLocation(doctorLocationSchedule: DoctorLocationSchedule[]): Observable<any[]> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {

            return this._http.post(this._url + '/DoctorLocationSchedule/associateLocationToDoctors', JSON.stringify(doctorLocationSchedule), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                    let schedules: DoctorLocationSchedule[];
                    if (data) {
                        schedules = (<Object[]>data).map((data: any) => {
                            return DoctorLocationScheduleAdapter.parseResponse(data);
                        });
                    }
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }
    associateLocationsToDoctor(doctorLocationSchedule: DoctorLocationSchedule[]): Observable<any[]> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {

            return this._http.post(this._url + '/DoctorLocationSchedule/associateDoctorToLocations', JSON.stringify(doctorLocationSchedule), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                    let schedules: DoctorLocationSchedule[];
                    if (data) {
                        schedules = (<Object[]>data).map((data: any) => {
                            return DoctorLocationScheduleAdapter.parseResponse(data);
                        });
                    }
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }


    deleteDoctorLocationSchedule(doctorLocationSchedule: DoctorLocationSchedule): Observable<DoctorLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/DoctorLocationSchedule/Delete/' + doctorLocationSchedule.id, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((schedule) => {
                    resolve(schedule);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule>>Observable.from(promise);
    }


}


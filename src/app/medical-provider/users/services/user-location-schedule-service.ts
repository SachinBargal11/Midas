import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { UserLocationSchedule } from '../models/user-location-schedule';
import { Schedule } from '../../locations/models/schedule';
import { ScheduleDetail } from '../../locations/models/schedule-detail';
import { UserLocationScheduleAdapter } from './adapters/user-location-schedule-adapter';
import { UsersStore } from '../stores/users-store';

@Injectable()
export class UserLocationScheduleService {

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

    getUserLocationSchedule(scheduleId: Number): Observable<any> {
        let promise: Promise<UserLocationSchedule> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/UserLocationSchedule/get/' + scheduleId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedData: UserLocationSchedule = null;
                    parsedData = UserLocationScheduleAdapter.parseResponse(data);
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<UserLocationSchedule>>Observable.fromPromise(promise);
    }

    getUserLocationScheduleByLocationId(locationId: Number): Observable<UserLocationSchedule[]> {
        let promise: Promise<UserLocationSchedule[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/UserLocationSchedule/GetByLocationId/' + locationId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let schedules: UserLocationSchedule[] = [];
                    if (_.isArray(data)) {
                        schedules = (<Object[]>data).map((data: any) => {
                            return UserLocationScheduleAdapter.parseResponse(data);
                        });
                    }
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<UserLocationSchedule[]>>Observable.fromPromise(promise);
    }
    getUserLocationScheduleByUserId(userId: Number): Observable<any> {
        let promise: Promise<UserLocationSchedule[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/UserLocationSchedule/GetByUserId/' + userId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let schedules: UserLocationSchedule[];
                    if (data) {
                        schedules = (<Object[]>data).map((data: any) => {
                            return UserLocationScheduleAdapter.parseResponse(data);
                        });
                    }
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<UserLocationSchedule[]>>Observable.fromPromise(promise);
    }
    getUserLocationScheduleByUserIdAndLocationId(userId: Number, locationId: Number): Observable<any> {
        let promise: Promise<UserLocationSchedule> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/UserLocationSchedule/GetByLocationAndUser/' + locationId + '/' + userId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let schedule: UserLocationSchedule;
                    // let schedules: any[] = (<Object[]>data).map((data: any) => {
                    schedule = UserLocationScheduleAdapter.parseResponse(data[0]);
                    // });
                    resolve(schedule);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<UserLocationSchedule>>Observable.fromPromise(promise);
    }

    getUserLocationSchedules(): Observable<UserLocationSchedule[]> {
        let promise: Promise<UserLocationSchedule[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/UserLocationSchedule/getall', {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((schedulesData: Array<Object>) => {
                    let schedules: any[] = (<Object[]>schedulesData).map((schedulesData: any) => {
                        return UserLocationScheduleAdapter.parseResponse(schedulesData);
                    });
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule[]>>Observable.fromPromise(promise);
    }

    addUserLocationSchedule(locationDetails: UserLocationSchedule): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let requestData: any = locationDetails.toJS();
            return this._http.post(environment.SERVICE_BASE_URL + '/UserLocationSchedule/add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((schedulesData: any) => {
                    let parsedSchedule: UserLocationSchedule = null;
                    parsedSchedule = UserLocationScheduleAdapter.parseResponse(schedulesData);
                    resolve(parsedSchedule);
                }, (error) => {
                    reject(error);
                });
        });

        return <Observable<any>>Observable.fromPromise(promise);
    }

    updateUserLocationSchedule(locationDetails: UserLocationSchedule): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let requestData: any = locationDetails.toJS();
            return this._http.post(environment.SERVICE_BASE_URL + '/UserLocationSchedule/add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((schedulesData: any) => {
                    let parsedSchedule: UserLocationSchedule = null;
                    parsedSchedule = UserLocationScheduleAdapter.parseResponse(schedulesData);
                    resolve(parsedSchedule);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    updateUserScheduleForLocation(userLocationSchedule: UserLocationSchedule, schedule: Schedule): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = userLocationSchedule.toJS();
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

            return this._http.post(environment.SERVICE_BASE_URL + '/UserLocationSchedule/add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                let parsedLocation: UserLocationSchedule = null;
                parsedLocation = UserLocationScheduleAdapter.parseResponse(data);
                resolve(parsedLocation);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    associateUsersToLocation(userLocationSchedule: UserLocationSchedule[]): Observable<any[]> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {

            return this._http.post(environment.SERVICE_BASE_URL + '/UserLocationSchedule/associateLocationToUser', JSON.stringify(userLocationSchedule), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                    let schedules: UserLocationSchedule[];
                    if (data) {
                        schedules = (<Object[]>data).map((data: any) => {
                            return UserLocationScheduleAdapter.parseResponse(data);
                        });
                    }
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }


    associateLocationsToUser(userLocationSchedule: UserLocationSchedule[]): Observable<any[]> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {
        debugger;
            return this._http.post(environment.SERVICE_BASE_URL + '/UserLocationSchedule/associateUserToLocations', JSON.stringify(userLocationSchedule), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                    let schedules: UserLocationSchedule[];
                    if (data) {
                        schedules = (<Object[]>data).map((data: any) => {
                            return UserLocationScheduleAdapter.parseResponse(data);
                        });
                    }
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }


    deleteUserLocationSchedule(userLocationSchedule: UserLocationSchedule): Observable<UserLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            return this._http.post(environment.SERVICE_BASE_URL + '/UserLocationSchedule/Delete/', JSON.stringify(userLocationSchedule), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((schedule) => {
                    resolve(schedule);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule>>Observable.from(promise);
    }


    deleteAppointmentsUserLocationSchedule(userLocationSchedule: UserLocationSchedule): Observable<UserLocationSchedule> {        
        let promise = new Promise((resolve, reject) => {
            return this._http.post(environment.SERVICE_BASE_URL + '/UserLocationSchedule/DeleteAllAppointmentsandUserLocationSchedule',  JSON.stringify(userLocationSchedule), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((schedule) => {
                    resolve(schedule);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule>>Observable.from(promise);
    }


}


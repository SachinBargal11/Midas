import { LocationsStore } from '../../locations/stores/locations-store';
import { LocationDetails } from '../../locations/models/location-details';
import { RoomsStore } from '../stores/rooms-store';
import { Room } from '../models/room';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { Schedule } from '../models/rooms-schedule';
import { ScheduleDetail } from '../../locations/models/schedule-detail';
import { ScheduleAdapter } from './adapters/rooms-schedule-adapter';

@Injectable()
export class RoomScheduleService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _locationsStore: LocationsStore,
        private _roomsStore: RoomsStore,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getSchedule(scheduleId: Number): Observable<any> {
        let promise: Promise<Schedule> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Schedule/get/' + scheduleId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedData: Schedule = null;
                    parsedData = ScheduleAdapter.parseResponse(data);
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Schedule>>Observable.fromPromise(promise);
    }

    getSchedules(companyId: number): Observable<Schedule[]> {
        let promise: Promise<Schedule[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Schedule/getByCompanyId/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((schedulesData: Array<Object>) => {
                    let schedules: any[] = (<Object[]>schedulesData).map((schedulesData: any) => {
                        return ScheduleAdapter.parseResponse(schedulesData);
                    });
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Schedule[]>>Observable.fromPromise(promise);
    }
    getAllSchedules(): Observable<Schedule[]> {
        let promise: Promise<Schedule[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/Schedule/GetAll', null, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((schedulesData: Array<Object>) => {
                    let schedules: any[] = (<Object[]>schedulesData).map((schedulesData: any) => {
                        return ScheduleAdapter.parseResponse(schedulesData);
                    });
                    resolve(schedules);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Schedule[]>>Observable.fromPromise(promise);
    }

    addSchedule(schedule: Schedule, room: Room): Observable<any> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let requestData: any = schedule.toJS();
            requestData.companyId = companyId;
            requestData.scheduleDetails = _.map(requestData.scheduleDetails, function (currentScheduleDetail: ScheduleDetail) {
                let currentScheduleDetailData: any = currentScheduleDetail.toJS();
                return _.extend(currentScheduleDetailData, {
                    slotStart: currentScheduleDetailData.slotStart ? currentScheduleDetailData.slotStart.format('HH:mm:ss') : null,
                    slotEnd: currentScheduleDetailData.slotEnd ? currentScheduleDetailData.slotEnd.format('HH:mm:ss') : null,
                });
            });
            return this._http.post(this._url + '/Schedule/Add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((schedulesData: any) => {
                    let parsedSchedule: Schedule = null;
                    parsedSchedule = ScheduleAdapter.parseResponse(schedulesData);
                    resolve(parsedSchedule);
                }, (error) => {
                    reject(error);
                });
        });

        return <Observable<any>>Observable.fromPromise(promise)
            .flatMap((schedule: Schedule) => {
                return this._roomsStore.updateScheduleForRoom(room, schedule);
            });
    }
    updateSchedule(scheduleDetail: Schedule, room: Room): Observable<any> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let requestData: any = scheduleDetail.toJS();
            requestData.companyId = companyId;
            requestData.scheduleDetails = _.map(requestData.scheduleDetails, function (currentScheduleDetail: ScheduleDetail) {
                let currentScheduleDetailData: any = currentScheduleDetail.toJS();
                return _.extend(currentScheduleDetailData, {
                    slotStart: currentScheduleDetailData.slotStart ? currentScheduleDetailData.slotStart.format('HH:mm:ss') : null,
                    slotEnd: currentScheduleDetailData.slotEnd ? currentScheduleDetailData.slotEnd.format('HH:mm:ss') : null,
                });
            });
            return this._http.post(this._url + '/Schedule/Add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((schedulesData: any) => {
                    let parsedSchedule: Schedule = null;
                    parsedSchedule = ScheduleAdapter.parseResponse(schedulesData);
                    resolve(parsedSchedule);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise)
            .flatMap((schedule: Schedule) => {
                return this._roomsStore.updateScheduleForRoom(room, schedule);
            });
    }
    deleteSchedule(schedule: Schedule): Observable<Schedule> {
        let promise = new Promise((resolve, reject) => {
            return this._http.delete(`${this._url}/${schedule.id}`, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((schedule) => {
                    resolve(schedule);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Schedule>>Observable.from(promise);
    }


}


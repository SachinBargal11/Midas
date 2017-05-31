import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { SessionStore } from '../../../commons/stores/session-store';
import { AvailableSlot } from '../models/available-slots';
import { AvailableSlotAdapter } from './adapters/available-slot-adapter';



@Injectable()
export class AvailableSlotsService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getAvailableSlotsByLocationAndDoctorId(locationId: Number, doctorId: Number, startDate: moment.Moment, endDate: moment.Moment): Observable<AvailableSlot[]> {
        let formattedStartDate: string = startDate.format('YYYY-MM-DD');
        let formattedEndDate: string = endDate.format('YYYY-MM-DD');
        let promise: Promise<AvailableSlot[]> = new Promise((resolve, reject) => {
            return this._http.get(`${this._url}/calendarEvent/GetFreeSlotsForDoctorByLocationId/${doctorId}/${locationId}/${formattedStartDate}/${formattedEndDate}`, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let availableSlots: AvailableSlot[] = [];
                    if (_.isArray(data)) {
                        availableSlots = (<Object[]>data).map((data: any) => {
                            return AvailableSlotAdapter.parseResponse(data);
                        });
                    }
                    resolve(availableSlots);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<AvailableSlot[]>>Observable.fromPromise(promise);
    }

    getAvailableSlotsByLocationAndRoomId(locationId: Number, roomId: Number, startDate: moment.Moment, endDate: moment.Moment): Observable<AvailableSlot[]> {
        let formattedStartDate: string = startDate.format('YYYY-MM-DD');
        let formattedEndDate: string = endDate.format('YYYY-MM-DD');
        let promise: Promise<AvailableSlot[]> = new Promise((resolve, reject) => {
            return this._http.get(`${this._url}/calendarEvent/GetFreeSlotsForRoomByLocationId/${roomId}/${locationId}/${formattedStartDate}/${formattedEndDate}`, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let availableSlots: AvailableSlot[] = [];
                    if (_.isArray(data)) {
                        availableSlots = (<Object[]>data).map((data: any) => {
                            return AvailableSlotAdapter.parseResponse(data);
                        });
                    }
                    resolve(availableSlots);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<AvailableSlot[]>>Observable.fromPromise(promise);
    }


}

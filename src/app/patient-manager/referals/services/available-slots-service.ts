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

    getAvailableSlotsByLocationAndDoctorId(locationId: Number, doctorId: Number, startDate: string, endDate: string): Observable<AvailableSlot[]> {
        let promise: Promise<AvailableSlot[]> = new Promise((resolve, reject) => {
            return this._http.get(`${environment.SERVICE_BASE_URL}/calendarEvent/getFreeSlotsByLocationAndDoctorId/${locationId}/${doctorId}/${startDate}/${endDate}`, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    
                }, (error) => {
                   let data = [
                        {
                            "forDate": "2017-05-02T14:00:00",
                            "startEndTimes": [
                                {
                                    "start": "2017-05-02T14:30:00",
                                    "end": "2017-05-02T15:00:00"
                                },
                                {
                                    "start": "2017-05-02T15:00:00",
                                    "end": "2017-05-02T15:30:00"
                                },
                                {
                                    "start": "2017-05-02T15:30:00",
                                    "end": "2017-05-02T16:00:00"
                                }
                            ]
                        },
                        {
                            "forDate": "2017-05-03T14:00:00",
                            "startEndTimes": [
                                {
                                    "start": "2017-05-03T14:30:00",
                                    "end": "2017-05-03T15:00:00"
                                },
                                {
                                    "$id": "7",
                                    "start": "2017-05-03T15:00:00",
                                    "end": "2017-05-03T15:30:00"
                                },
                                {
                                    "$id": "8",
                                    "start": "2017-05-03T15:30:00",
                                    "end": "2017-05-03T16:00:00"
                                }
                            ]
                        },
                        {
                            "forDate": "2017-05-04T14:00:00",
                            "startEndTimes": [
                                {
                                    "start": "2017-05-04T14:30:00",
                                    "end": "2017-05-04T15:00:00"
                                },
                                {
                                    "start": "2017-05-04T15:00:00",
                                    "end": "2017-05-04T15:30:00"
                                },
                                {
                                    "start": "2017-05-04T15:30:00",
                                    "end": "2017-05-04T16:00:00"
                                }
                            ]
                        },
                        {
                            "forDate": "2017-05-05T14:00:00",
                            "startEndTimes": [
                                {
                                    "start": "2017-05-05T14:30:00",
                                    "end": "2017-05-05T15:00:00"
                                },
                                {
                                    "start": "2017-05-05T15:00:00",
                                    "end": "2017-05-05T15:30:00"
                                },
                                {
                                    "start": "2017-05-05T15:30:00",
                                    "end": "2017-05-05T16:00:00"
                                }
                            ]
                        }
                    ];
                    let availableSlots: AvailableSlot[] = [];
                    if (_.isArray(data)) {
                        availableSlots = (<Object[]>data).map((data: any) => {
                            return AvailableSlotAdapter.parseResponse(data);
                        });
                    }
                    resolve(availableSlots);
                    reject(error);
                });

        });
        return <Observable<AvailableSlot[]>>Observable.fromPromise(promise);
    }


}

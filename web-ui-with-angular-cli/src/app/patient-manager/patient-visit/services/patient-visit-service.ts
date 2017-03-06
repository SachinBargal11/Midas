import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { PatientVisit } from '../models/patient-visit';
import { SessionStore } from '../../../commons/stores/session-store';
import { PatientVisitAdapter } from './adapters/patient-visit-adapter';
import * as moment from 'moment';
import * as _ from 'underscore';


@Injectable()
export class PatientVisitService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getPatientVisit(patientVisitId: Number): Observable<PatientVisit> {
        let promise: Promise<PatientVisit> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientVisit/get/' + patientVisitId).map(res => res.json())
                .subscribe((data: any) => {
                    let patientVisits = null;
                    if (data) {
                        patientVisits = PatientVisitAdapter.parseResponse(data);
                        resolve(patientVisits);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit>>Observable.fromPromise(promise);
    }

    getPatientVisitsByLocationId(locationId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientVisit/getByLocationId/' + locationId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByDoctorId(doctorId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientVisit/getByDoctorId/' + doctorId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByLocationAndRoomId(locationId: number, roomId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientVisit/getByLocationAndRoomId/' + locationId + '/' + roomId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByLocationAndDoctorId(locationId: number, doctorId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientVisit/getByLocationAndDoctorId/' + locationId + '/' + doctorId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    addPatientVisit(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let promise: Promise<PatientVisit> = new Promise((resolve, reject) => {
            let requestData = _.extend(patientVisitDetail.toJS(), {
                calendarEvent: _.extend(patientVisitDetail.calendarEvent.toJS(), {
                    recurrenceRule: patientVisitDetail.calendarEvent.recurrenceRule
                        ? patientVisitDetail.calendarEvent.recurrenceRule.toString()
                        : '',
                    recurrenceException: ''
                })
            });
            requestData = _.omit(requestData, 'caseId');
            return this._http.post(this._url + '/PatientVisit/Save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedPatientVisit: PatientVisit = null;
                    parsedPatientVisit = PatientVisitAdapter.parseResponse(data);
                    resolve(parsedPatientVisit);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.fromPromise(promise);
    }

    updateCalendarEvent(scheduledEvent: ScheduledEvent): Observable<ScheduledEvent> {
        let promise = new Promise((resolve, reject) => {
            debugger;
            let requestData = {
                calendarEvent: scheduledEvent.toJS()
            }
            return this._http.post(this._url + '/PatientVisit/Save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedPatientVisit: PatientVisit = null;
                    parsedPatientVisit = PatientVisitAdapter.parseResponse(data);
                    resolve(parsedPatientVisit);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ScheduledEvent>>Observable.fromPromise(promise);
    }

    updatePatientVisit(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            debugger;
            let requestData = _.extend(patientVisitDetail.toJS(), {
                calendarEvent: _.extend(patientVisitDetail.calendarEvent.toJS(), {
                    recurrenceRule: patientVisitDetail.calendarEvent.recurrenceRule
                        ? patientVisitDetail.calendarEvent.recurrenceRule.toString()
                        : '',
                    recurrenceException: _.map(patientVisitDetail.calendarEvent.recurrenceException, (datum: moment.Moment) => {
                        return datum.format('YYYYMMDDThhmmss') + 'Z';
                    }).join(',')
                })
            });
            requestData = _.omit(requestData, 'caseId');
            return this._http.post(this._url + '/PatientVisit/Save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedPatientVisit: PatientVisit = null;
                    parsedPatientVisit = PatientVisitAdapter.parseResponse(data);
                    resolve(parsedPatientVisit);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.fromPromise(promise);

    }

    deletePatientVisit(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/PatientVisit/Save', JSON.stringify(patientVisitDetail), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }
}


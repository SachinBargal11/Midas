import { ScheduledEventAdapter } from '../../../medical-provider/locations/services/adapters/scheduled-event-adapter';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { VisitReferral } from '../models/visit-referral';
import { SessionStore } from '../../../commons/stores/session-store';
import { visitReferralAdapter } from './adapters/visit-referral-adapter';
import * as moment from 'moment';
import * as _ from 'underscore';


@Injectable()
export class VisitReferralService {

    private _url = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getPendingReferralById(pendingReferralId: Number): Observable<VisitReferral> {
        let promise: Promise<VisitReferral> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PendingReferral/get/' + pendingReferralId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let visitReferral = null;
                    if (data) {
                        visitReferral = visitReferralAdapter.parseResponse(data);
                        resolve(visitReferral);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<VisitReferral>>Observable.fromPromise(promise);
    }

    getPendingReferralByPatientVisitId(patientVisitId: Number): Observable<VisitReferral[]> {
        let promise: Promise<VisitReferral[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PendingReferral/getByPatientVisitId/' + patientVisitId , {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let visitReferral = (<Object[]>data).map((data: any) => {
                        return visitReferralAdapter.parseResponse(data);
                    });
                    resolve(visitReferral);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<VisitReferral[]>>Observable.fromPromise(promise);
    }
    getPendingReferralByCompanyId(companyId: Number): Observable<VisitReferral[]> {
        let promise: Promise<VisitReferral[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PendingReferral/getPendingReferralByCompanyId/' + companyId, {
                headers: this._headers
            } ).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let visitReferral = (<Object[]>data).map((data: any) => {
                        return visitReferralAdapter.parseResponse(data);
                    });
                    resolve(visitReferral);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<VisitReferral[]>>Observable.fromPromise(promise);
    }

    getPendingReferralByDoctorId(doctorId: Number): Observable<VisitReferral[]> {
        let promise: Promise<VisitReferral[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PendingReferral/getByDoctorId/' + doctorId , {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let visitReferral = (<Object[]>data).map((data: any) => {
                        return visitReferralAdapter.parseResponse(data);
                    });
                    resolve(visitReferral);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<VisitReferral[]>>Observable.fromPromise(promise);
    }
    getPendingReferralBySpecialityId(specialityId: Number): Observable<VisitReferral[]> {
        let promise: Promise<VisitReferral[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PendingReferral/getBySpecialityId/' + specialityId , {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let visitReferral = (<Object[]>data).map((data: any) => {
                        return visitReferralAdapter.parseResponse(data);
                    });
                    resolve(visitReferral);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<VisitReferral[]>>Observable.fromPromise(promise);
    }
    saveVisitReferral(visitReferralDetail: VisitReferral[]): Observable<VisitReferral[]> {
        let promise: Promise<VisitReferral[]> = new Promise((resolve, reject) => {
            // return this._http.post(this._url + '/PendingReferral/Add', JSON.stringify(requestData), {
            return this._http.post(this._url + '/PendingReferral/SaveList', JSON.stringify(visitReferralDetail), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let visitReferral = (<Object[]>data).map((data: any) => {
                        return visitReferralAdapter.parseResponse(data);
                    });
                    resolve(visitReferral);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<VisitReferral[]>>Observable.fromPromise(promise);
    }
}


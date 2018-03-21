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
import { UnscheduledVisitReferralAdapter } from './adapters/unscheduled-visit-referral-adapter';
import { UnscheduledVisitAdapter } from './adapters/unscheduled-visit-adapter';
import { UnscheduledVisitReferral } from '../models/unscheduled-visit-referral';
import { UnscheduledVisit } from '../models/unscheduled-visit';


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
            return this._http.get(environment.SERVICE_BASE_URL + '/PendingReferral/get/' + pendingReferralId, {
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
            return this._http.get(environment.SERVICE_BASE_URL + '/PendingReferral/getByPatientVisitId/' + patientVisitId , {
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
            return this._http.get(environment.SERVICE_BASE_URL + '/PendingReferral/getPendingReferralByCompanyId/' + companyId, {
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
            return this._http.get(environment.SERVICE_BASE_URL + '/PendingReferral/getByDoctorId/' + doctorId , {
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
            return this._http.get(environment.SERVICE_BASE_URL + '/PendingReferral/getBySpecialityId/' + specialityId , {
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
            // return this._http.post(environment.SERVICE_BASE_URL + '/PendingReferral/Add', JSON.stringify(requestData), {
            return this._http.post(environment.SERVICE_BASE_URL + '/PendingReferral/SaveList', JSON.stringify(visitReferralDetail), {
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

    saveUnscheduledVisitReferral(unscheduledVisitReferralDetail: UnscheduledVisitReferral): Observable<UnscheduledVisitReferral> {
        let promise: Promise<UnscheduledVisitReferral> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/patientVisitUnscheduled/saveReferralPatientVisitUnscheduled', JSON.stringify(unscheduledVisitReferralDetail), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    // let parsedData: UnscheduledVisitReferral = null;
                    // parsedData = UnscheduledVisitReferralAdapter.parseResponse(parsedData);
                    // resolve(parsedData);
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<UnscheduledVisitReferral>>Observable.fromPromise(promise);
    }
    getUnscheduledVisitReferralByCompanyId(): Observable<UnscheduledVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<UnscheduledVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/patientVisitUnscheduled/getReferralPatientVisitUnscheduledByCompanyId/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
            .subscribe((data: Array<Object>) => {
                let parsedData = (<Object[]>data).map((data: any) => {
                    return UnscheduledVisitAdapter.parseResponse(data);
                });
                resolve(parsedData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<UnscheduledVisit[]>>Observable.fromPromise(promise);
    }
    getUnscheduledVisitByCompanyId(): Observable<UnscheduledVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<UnscheduledVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/patientVisitUnscheduled/getPatientVisitUnscheduledByCompanyId/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
            .subscribe((data: Array<Object>) => {
                debugger;
                let parsedData = (<Object[]>data).map((data: any) => {
                    return UnscheduledVisitAdapter.parseResponse(data);
                });
                resolve(parsedData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<UnscheduledVisit[]>>Observable.fromPromise(promise);
    }
}


import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { Referral } from '../models/referral';
import { ReferralAdapter } from './adapters/referral-adapter';

@Injectable()
export class ReferralService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(private _http: Http) {
        this._headers.append('Content-Type', 'application/json');
    }

    getReferralsByCaseId(caseId: Number): Observable<Referral[]> {
        let promise: Promise<Referral[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/referral/getByCaseId/' + caseId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let referrals = (<Object[]>data).map((data: any) => {
                        return ReferralAdapter.parseResponse(data);
                    });
                    resolve(referrals);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Referral[]>>Observable.fromPromise(promise);
    }
    getReferralsByReferringCompanyId(comapanyId: Number): Observable<Referral[]> {
        let promise: Promise<Referral[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/referral/getByReferringCompanyId/' + comapanyId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let referrals = (<Object[]>data).map((data: any) => {
                        return ReferralAdapter.parseResponse(data);
                    });
                    resolve(referrals);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Referral[]>>Observable.fromPromise(promise);
    }
    getReferralsByReferredToCompanyId(comapanyId: Number): Observable<Referral[]> {
        let promise: Promise<Referral[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/referral/getByReferredToCompanyId/' + comapanyId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let referrals = (<Object[]>data).map((data: any) => {
                        return ReferralAdapter.parseResponse(data);
                    });
                    resolve(referrals);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Referral[]>>Observable.fromPromise(promise);
    }
    getReferralsByReferredToDoctorId(doctorId: Number): Observable<Referral[]> {
        let promise: Promise<Referral[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/referral/getByReferredToDoctorId/' + doctorId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let referrals = (<Object[]>data).map((data: any) => {
                        return ReferralAdapter.parseResponse(data);
                    });
                    resolve(referrals);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Referral[]>>Observable.fromPromise(promise);
    }
    addReferral(referral: Referral): Observable<Referral> {
        let promise: Promise<Referral> = new Promise((resolve, reject) => {
            let requestData: any = referral.toJS();
            requestData = _.omit(requestData, 'room', 'case', 'referringUser', 'referringLocation', 'referringCompany', 'referredToDoctor', 'referredToLocation', 'referredToCompany', 'referralDocument');
            return this._http.post(this._url + '/Referral/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedReferral: Referral = null;
                    parsedReferral = ReferralAdapter.parseResponse(data);
                    resolve(parsedReferral);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Referral>>Observable.fromPromise(promise);
    }
    deleteReferral(referral: Referral): Observable<Referral> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Referral/Delete/' + referral.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    if (data) {
                        let parsedReferral: Referral = null;
                        parsedReferral = ReferralAdapter.parseResponse(data);
                        resolve(parsedReferral);
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Referral>>Observable.from(promise);
    }
}

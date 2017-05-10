import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { SessionStore } from '../../../commons/stores/session-store';
import { PrefferedMedicalProvider } from '../models/preferred-medical-provider';
import { PrefferedMedicalProviderAdapter } from './adapters/preferred-medical-provider-adapter';
import { PendingReferralList } from '../models/pending-referral-list';
import { PendingReferralListAdapter } from './adapters/pending-referral-list-adapter';
import { PendingReferral } from '../models/pending-referral';
import { PendingReferralAdapter } from './adapters/pending-referral-adapter';
import * as moment from 'moment';
import * as _ from 'underscore';


@Injectable()
export class PendingReferralService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    // savePendingReferral(pendingReferralDetail: PendingReferral): Observable<PendingReferral> {
    //     let promise: Promise<PendingReferral> = new Promise((resolve, reject) => {
    //         return this._http.post(this._url + '/PatientVisit/Save', JSON.stringify(pendingReferralDetail), {
    //             headers: this._headers
    //         }).map(res => res.json())
    //             .subscribe((data: any) => {
    //                 let pendingReferral: PendingReferral = null;
    //                 pendingReferral = PendingReferralAdapter.parseResponse(data);
    //                 resolve(pendingReferral);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<PendingReferral>>Observable.fromPromise(promise);
    // }

    getPreferredCompanyDoctorsAndRoomByCompanyId(companyId: Number): Observable<PrefferedMedicalProvider[]> {
        let promise: Promise<PrefferedMedicalProvider[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PreferredMedicalProvider/GetPreferredCompanyDoctorsAndRoomByCompanyId/' + companyId).map(res => res.json())
                .subscribe((data: any) => {
                    let prefferedMedicalProvider: PrefferedMedicalProvider[] = [];
                    if (_.isArray(data)) {
                        prefferedMedicalProvider = (<Object[]>data).map((data: any) => {
                            return PrefferedMedicalProviderAdapter.parseResponse(data);
                        });
                    }
                    resolve(prefferedMedicalProvider);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PrefferedMedicalProvider[]>>Observable.fromPromise(promise);
    }

    getPendingReferralByCompanyId(companyId: Number): Observable<PendingReferralList[]> {
        let promise: Promise<PendingReferralList[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PendingReferral/getPendingReferralByCompanyId/' + companyId).map(res => res.json())
                .subscribe((data: any) => {
                    let pendingReferralList: PendingReferralList[] = [];
                    if (_.isArray(data)) {
                        pendingReferralList = (<Object[]>data).map((data: any) => {
                            return PendingReferralListAdapter.parseResponse(data);
                        });
                    }
                    resolve(pendingReferralList);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PendingReferralList[]>>Observable.fromPromise(promise);
    }

    savePendingReferral(pendingReferralDetail: PendingReferral): Observable<PendingReferral> {
        let promise: Promise<PendingReferral> = new Promise((resolve, reject) => {
            // return this._http.post(this._url + '/PendingReferral/Add', JSON.stringify(requestData), {
            return this._http.post(this._url + '/Referral2/save', JSON.stringify(pendingReferralDetail), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data:any) => {
                    let parsedReferral:PendingReferral = null;
                     parsedReferral = PendingReferralAdapter.parseResponse(data);
                    resolve(parsedReferral);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PendingReferral>>Observable.fromPromise(promise);
    }
}

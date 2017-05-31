import { SessionStore } from '../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { Adjuster } from '../models/adjuster';
import { AdjusterAdapter } from './adapters/adjuster-adapter';

@Injectable()
export class AdjusterMasterService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/insurance';
    private _headers: Headers = new Headers();

    constructor(private _http: Http, private _sessionStore: SessionStore) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }
    getAdjusterMaster(adjusterId: Number): Observable<Adjuster> {
        let promise: Promise<Adjuster> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/AdjusterMaster/get/' + adjusterId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let adjuster = null;
                    adjuster = AdjusterAdapter.parseResponse(data);
                    resolve(adjuster);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Adjuster>>Observable.fromPromise(promise);
    }
    getAdjusterMasterByInsurance(insuranceId: Number): Observable<Adjuster> {
        let promise: Promise<Adjuster> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/AdjusterMaster/getByInsuranceMasterId/' + insuranceId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let adjuster = null;
                    adjuster = AdjusterAdapter.parseResponse(data);
                    resolve(adjuster);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Adjuster>>Observable.fromPromise(promise);
    }

    getAllAdjusterMaster(): Observable<Adjuster[]> {
        let promise: Promise<Adjuster[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/AdjusterMaster/getAll/', {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let adjuster = (<Object[]>data).map((data: any) => {
                        return AdjusterAdapter.parseResponse(data);
                    });
                    resolve(adjuster);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Adjuster[]>>Observable.fromPromise(promise);
    }

    //
    getAdjusterMastersByCompanyAndInsuranceMasterId(companyId: Number, insuranceMasterId: Number): Observable<Adjuster[]> {
        let promise: Promise<Adjuster[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/AdjusterMaster/GetByCompanyAndInsuranceMasterId/' + companyId + '/' + insuranceMasterId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let adjuster = (<Object[]>data).map((data: any) => {
                        return AdjusterAdapter.parseResponse(data);
                    });
                    resolve(adjuster);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Adjuster[]>>Observable.fromPromise(promise);
    }
    getAllAdjusterMasterByCompany(companyId: Number): Observable<Adjuster[]> {
        let promise: Promise<Adjuster[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/AdjusterMaster/getByCompanyId/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let adjuster = (<Object[]>data).map((data: any) => {
                        return AdjusterAdapter.parseResponse(data);
                    });
                    resolve(adjuster);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Adjuster[]>>Observable.fromPromise(promise);
    }
    //
    addAdjuster(adjuster: Adjuster): Observable<Adjuster> {
        let promise: Promise<Adjuster> = new Promise((resolve, reject) => {
            let requestData: any = adjuster.toJS();
            requestData.contactInfo = requestData.adjusterContact;
            requestData.addressInfo = requestData.adjusterAddress;
            requestData = _.omit(requestData, 'adjusterContact', 'adjusterAddress');
            return this._http.post(this._url + '/AdjusterMaster/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedAdjuster: Adjuster = null;
                    parsedAdjuster = AdjusterAdapter.parseResponse(data);
                    resolve(parsedAdjuster);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Adjuster>>Observable.fromPromise(promise);
    }
    updateAdjuster(adjuster: Adjuster): Observable<Adjuster> {
        let promise: Promise<Adjuster> = new Promise((resolve, reject) => {
            let requestData: any = adjuster.toJS();
            requestData.contactInfo = requestData.adjusterContact;
            requestData.addressInfo = requestData.adjusterAddress;
            requestData = _.omit(requestData, 'adjusterContact', 'adjusterAddress');
            return this._http.post(this._url + '/AdjusterMaster/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedAdjuster: Adjuster = null;
                    parsedAdjuster = AdjusterAdapter.parseResponse(data);
                    resolve(parsedAdjuster);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Adjuster>>Observable.fromPromise(promise);
    }
    deleteAdjuster(adjuster: Adjuster): Observable<Adjuster> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/AdjusterMaster/delete/' + adjuster.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    let parsedAdjuster: Adjuster = null;
                    parsedAdjuster = AdjusterAdapter.parseResponse(data);
                    resolve(parsedAdjuster);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Adjuster>>Observable.from(promise);
    }
}

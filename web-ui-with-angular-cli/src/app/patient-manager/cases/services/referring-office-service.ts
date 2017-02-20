import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { ReferringOffice } from '../models/referring-office';
import { ReferringOfficeAdapter } from './adapters/referring-office-adapter';

@Injectable()
export class ReferringOfficeService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(private _http: Http) {
        this._headers.append('Content-Type', 'application/json');
    }
    getReferringOffice(referringOfficeId: Number): Observable<ReferringOffice> {
        let promise: Promise<ReferringOffice> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/RefferingOffice/get/' + referringOfficeId).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    let referringOffice = null;
                    if (data) {
                        referringOffice = ReferringOfficeAdapter.parseResponse(data);
                        resolve(referringOffice);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<ReferringOffice>>Observable.fromPromise(promise);
    }

    getReferringOffices(patientId: Number): Observable<ReferringOffice[]> {
        let promise: Promise<ReferringOffice[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/RefferingOffice/getByCaseId/' + patientId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let referringOffices = (<Object[]>data).map((data: any) => {
                        return ReferringOfficeAdapter.parseResponse(data);
                    });
                    resolve(referringOffices);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<ReferringOffice[]>>Observable.fromPromise(promise);
    }
    addReferringOffice(referringOffice: ReferringOffice): Observable<ReferringOffice> {
        let promise: Promise<ReferringOffice> = new Promise((resolve, reject) => {
            let requestData: any = referringOffice.toJS();
            return this._http.post(this._url + '/RefferingOffice/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedReferringOffice: ReferringOffice = null;
                    parsedReferringOffice = ReferringOfficeAdapter.parseResponse(data);
                    resolve(parsedReferringOffice);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ReferringOffice>>Observable.fromPromise(promise);
    }
    updateReferringOffice(referringOffice: ReferringOffice): Observable<ReferringOffice> {
        let promise = new Promise((resolve, reject) => {
            let requestData: any = referringOffice.toJS();
            return this._http.post(this._url + '/RefferingOffice/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedReferringOffice: ReferringOffice = null;
                    parsedReferringOffice = ReferringOfficeAdapter.parseResponse(data);
                    resolve(parsedReferringOffice);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ReferringOffice>>Observable.fromPromise(promise);
    }
    deleteReferringOffice(referringOffice: ReferringOffice): Observable<ReferringOffice> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/RefferingOffice/Delete/' + referringOffice.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    if (data) {
                        let parsedReferringOffice: ReferringOffice = null;
                        parsedReferringOffice = ReferringOfficeAdapter.parseResponse(data);
                        resolve(parsedReferringOffice);
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ReferringOffice>>Observable.from(promise);
    }
}

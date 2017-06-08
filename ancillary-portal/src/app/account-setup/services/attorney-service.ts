import { SessionStore } from '../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { Attorney } from '../models/attorney';
import { AttorneyAdapter } from './adapters/attorney-adpter';
import { PrefferedAttorneyAdapter } from '../services/adapters/preffered-attorney-adapter';
import { Account } from '../../account/models/account';
import { CompanyAdapter } from '../../account/services/adapters/company-adapter';
@Injectable()
export class AttorneyMasterService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/insurance';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }
    getAttorneyMaster(attorneyId: Number): Observable<Attorney> {
        let promise: Promise<Attorney> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PreferredAttorneyProvider/get/' + attorneyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let attorney = null;
                    attorney = AttorneyAdapter.parseResponse(data);
                    resolve(attorney);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Attorney>>Observable.fromPromise(promise);
    }

    getAllAttorneyMasterByCompany(companyId: Number): Observable<Attorney[]> {
        let promise: Promise<Attorney[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PreferredAttorneyProvider/getPrefAttorneyProviderByCompanyId/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let attorney = (<Object[]>data).map((data: any) => {
                        return AttorneyAdapter.parseResponse(data);
                    });
                    resolve(attorney);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Attorney[]>>Observable.fromPromise(promise);
    }

    getAllAttorney(companyId: Number): Observable<Attorney[]> {
        let promise: Promise<Attorney[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PreferredAttorneyProvider/GetAllPrefAttorneyProviderExcludeAssigned/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let allAttorney = (<Object[]>data).map((data: any) => {
                        return PrefferedAttorneyAdapter.parseResponse(data);
                    });
                    resolve(allAttorney);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Attorney[]>>Observable.fromPromise(promise);
    }

    assignAttorney(currentAttorneyId: Number, companyId: Number): Observable<Attorney> {
        let promise: Promise<Attorney> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PreferredAttorneyProvider/associatePrefAttorneyProviderWithCompany/' + currentAttorneyId + '/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let attorney = null;
                    attorney = AttorneyAdapter.parseResponse(data);
                    resolve(attorney);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Attorney>>Observable.fromPromise(promise);
    }
    addAttorney(requestData: any): Observable<Attorney> {
        let promise: Promise<Attorney> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this._url + '/PreferredAttorneyProvider/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Attorney>>Observable.fromPromise(promise);
    }
    updateAttorney(requestData: Attorney): Observable<Attorney> {
        let promise: Promise<Attorney> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this._url + '/PreferredAttorneyProvider/updateAttorneyProvider', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Attorney>>Observable.fromPromise(promise);
    }

    deleteAttorney(attorney: Attorney): Observable<Attorney> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            // return this._http.get(this._url + '/AttorneyMaster/delete/' + attorney.id, {
            return this._http.get(this._url + '/PreferredAttorneyProvider/Delete/' + attorney.id).map(res => res.json())
                .subscribe((data) => {
                    let parsedAttorney: Attorney = null;
                    parsedAttorney = AttorneyAdapter.parseResponse(data);
                    resolve(parsedAttorney);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Attorney>>Observable.from(promise);
    }

    getAllProviders(): Observable<Account[]> {
        let promise: Promise<Account[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Company/getAll')
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let allProviders = (<Object[]>data).map((data: any) => {
                        return CompanyAdapter.parseResponse(data);
                    });
                    resolve(allProviders);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Account[]>>Observable.fromPromise(promise);
    }
}

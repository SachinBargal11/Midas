import { SessionStore } from '../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { AncillaryMaster } from '../models/ancillary-master';
import { AncillaryMasterAdapter } from './adapters/ancillary-adapter';
import { Account } from '../../account/models/account';
import { CompanyAdapter } from '../../account/services/adapters/company-adapter';


@Injectable()
export class AncillaryMasterService {
    companies: any[];
    private _url: string = `${environment.SERVICE_BASE_URL}`;

    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getAllAncillaries(companyId: Number): Observable<Account[]> {
        let promise: Promise<Account[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PreferredAncillaryProvider/getAllPrefAncillaryProviderExcludeAssigned/' + companyId, {
                headers: this._headers
            })
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

    assignAncillary(currentProviderId: Number, companyId: Number): Observable<AncillaryMaster> {
        let promise: Promise<AncillaryMaster> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PreferredAncillaryProvider/associateAncillaryProviderWithCompany/' + currentProviderId + '/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let provider = null;
                    provider = AncillaryMasterAdapter.parseResponse(data);
                    resolve(provider);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<AncillaryMaster>>Observable.fromPromise(promise);
    }

    getAncillaryMasters(companyId: Number): Observable<AncillaryMaster[]> {
        let promise: Promise<AncillaryMaster[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PreferredAncillaryProvider/getPrefAncillaryProviderByCompanyId/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let provider = (<Object[]>data).map((data: any) => {
                        return AncillaryMasterAdapter.parseResponse(data);
                    });
                    resolve(provider);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<AncillaryMaster[]>>Observable.fromPromise(promise);
    }

    addAncillary(requestData: any): Observable<AncillaryMaster> {
        let promise: Promise<AncillaryMaster> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(environment.SERVICE_BASE_URL + '/PreferredAncillaryProvider/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<AncillaryMaster>>Observable.fromPromise(promise);
    }

    updateAncillary(requestData: AncillaryMaster): Observable<AncillaryMaster> {
        let promise: Promise<AncillaryMaster> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(environment.SERVICE_BASE_URL + '/PreferredAncillaryProvider/updateMedicalProvider', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<AncillaryMaster>>Observable.fromPromise(promise);
    }

    deleteMedicalProvider(AncillaryMaster: AncillaryMaster): Observable<AncillaryMaster> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PreferredAncillaryProvider/Delete/' + AncillaryMaster.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    let parsedProvider: AncillaryMaster = null;
                    parsedProvider = AncillaryMasterAdapter.parseResponse(data);
                    resolve(parsedProvider);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<AncillaryMaster>>Observable.from(promise);
    }

    getMedicalProviderById(providerId: Number): Observable<AncillaryMaster> {
        let promise: Promise<AncillaryMaster> = new Promise((resolve, reject) => {
            // return this._http.get(environment.SERVICE_BASE_URL + '/PreferredMedicalProvider/Get/' + providerId).map(res => res.json())
            return this._http.get(environment.SERVICE_BASE_URL + '/PreferredMedicalProvider/getByPrefMedProviderId/' + providerId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let provider = null;
                    provider = AncillaryMasterAdapter.parseResponse(data);
                    resolve(provider);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<AncillaryMaster>>Observable.fromPromise(promise);
    }

}
import { SessionStore } from '../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { MedicalProviderMaster } from '../models/medical-provider-master';
import { MedicalProviderMasterAdapter } from './adapters/medical-provider-master-adapter';
import { Account } from '../../account/models/account';


@Injectable()
export class MedicalProviderMasterService {
    companies: any[];
    private _url: string = `${environment.SERVICE_BASE_URL}`;

    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }


    getAllProviders(companyId: Number): Observable<MedicalProviderMaster[]> {
        let promise: Promise<MedicalProviderMaster[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PreferredMedicalProvider/GetAllMedicalProviderExcludeAssigned/' + companyId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let allProviders = (<Object[]>data).map((data: any) => {
                        return MedicalProviderMasterAdapter.parseResponse(data);
                    });
                    resolve(allProviders);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<MedicalProviderMaster[]>>Observable.fromPromise(promise);
    }

    assignProviders(currentProviderId: Number, companyId: Number): Observable<MedicalProviderMaster> {
        let promise: Promise<MedicalProviderMaster> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PreferredMedicalProvider/associateMedicalProviderWithCompany/' + currentProviderId + '/' + companyId).map(res => res.json())
                .subscribe((data: any) => {
                    let provider = null;
                    provider = MedicalProviderMasterAdapter.parseResponse(data);
                    resolve(provider);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<MedicalProviderMaster>>Observable.fromPromise(promise);
    }

    getMedicalProviders(companyId: Number): Observable<MedicalProviderMaster[]> {
        let promise: Promise<MedicalProviderMaster[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '//' + companyId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let provider = (<Object[]>data).map((data: any) => {
                        return MedicalProviderMasterAdapter.parseResponse(data);
                    });
                    resolve(provider);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<MedicalProviderMaster[]>>Observable.fromPromise(promise);
    }

    addMedicalProvider(requestData: any): Observable<MedicalProviderMaster> {      
        let promise: Promise<MedicalProviderMaster> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this._url + '/PreferredMedicalProvider/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<MedicalProviderMaster>>Observable.fromPromise(promise);
    }

}
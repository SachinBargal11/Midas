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
import { CompanyAdapter } from '../../account/services/adapters/company-adapter';


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
        // this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }


    getAllProviders(companyId: Number): Observable<Account[]> {
        let promise: Promise<Account[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PreferredMedicalProvider/GetAllMedicalProviderExcludeAssigned/' + companyId, {
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

    assignProviders(currentProviderId: Number, companyId: Number): Observable<MedicalProviderMaster> {
        let promise: Promise<MedicalProviderMaster> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PreferredMedicalProvider/associateMedicalProviderWithCompany/' + currentProviderId + '/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
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

    getAllPreferredMedicalProviders(companyId: Number): Observable<MedicalProviderMaster[]> {
        let promise: Promise<MedicalProviderMaster[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PreferredMedicalProvider/getByCompanyId/' + companyId, {
                headers: this._headers
            })
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

    getMedicalProviders(companyId: Number): Observable<MedicalProviderMaster[]> {
        let promise: Promise<MedicalProviderMaster[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PreferredMedicalProvider/getByCompanyId/' + companyId, {
                headers: this._headers
            })
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

    updateMedicalProvider(requestData: MedicalProviderMaster): Observable<MedicalProviderMaster> {
        let promise: Promise<MedicalProviderMaster> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this._url + '/PreferredMedicalProvider/updateMedicalProvider', JSON.stringify(requestData), {
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

    generateToken(companyId: Number): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/OTPCompanyMapping/GenerateOTPForCompany/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    validateToken(token:number): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/OTPCompanyMapping/validateOTPForCompany/' + token, {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    associateValidateTokenWithCompany(token:number,companyId): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/OTPCompanyMapping/associatePreferredCompany/' + token + '/' + companyId , {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    deleteMedicalProvider(medicalProviderMaster: MedicalProviderMaster): Observable<MedicalProviderMaster> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PreferredMedicalProvider/Delete/' + medicalProviderMaster.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    let parsedProvider: MedicalProviderMaster = null;
                    parsedProvider = MedicalProviderMasterAdapter.parseResponse(data);
                    resolve(parsedProvider);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<MedicalProviderMaster>>Observable.from(promise);
    }

    getMedicalProviderById(providerId: Number): Observable<MedicalProviderMaster> {
        let promise: Promise<MedicalProviderMaster> = new Promise((resolve, reject) => {
            // return this._http.get(this._url + '/PreferredMedicalProvider/Get/' + providerId).map(res => res.json())
            return this._http.get(this._url + '/PreferredMedicalProvider/getByPrefMedProviderId/' + providerId, {
                headers: this._headers
            }).map(res => res.json())
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
}
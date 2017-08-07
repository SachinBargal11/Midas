import { SessionStore } from '../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { InsuranceMaster } from '../../patient-manager/patients/models/insurance-master';
import { InsuranceMasterAdapter } from '../../patient-manager/patients/services/adapters/insurance-master-adapter';

@Injectable()
export class InsuranceMasterService {
    companyId: number;
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/insurance';
    private _headers: Headers = new Headers();

    constructor(private _http: Http, private _sessionStore: SessionStore) {
        this.companyId = this._sessionStore.session.currentCompany.id;
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }
    getInsuranceMaster(insuranceMasterId: Number): Observable<InsuranceMaster> {
        let promise: Promise<InsuranceMaster> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/InsuranceMaster/getInsuranceDetails/' + insuranceMasterId + '/' + this.companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let insuranceMaster = null;
                    insuranceMaster = InsuranceMasterAdapter.parseResponse(data);
                    resolve(insuranceMaster);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<InsuranceMaster>>Observable.fromPromise(promise);
    }

    getAllInsuranceMasters(): Observable<InsuranceMaster[]> {
        let promise: Promise<InsuranceMaster[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/InsuranceMaster/getMasterAndByCompanyId/' + this.companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let insuranceMaster = (<Object[]>data).map((data: any) => {
                        return InsuranceMasterAdapter.parseResponse(data);
                    });
                    resolve(insuranceMaster);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<InsuranceMaster[]>>Observable.fromPromise(promise);
    }

    addInsuranceMaster(insuranceMaster: InsuranceMaster): Observable<InsuranceMaster> {
        let promise: Promise<InsuranceMaster> = new Promise((resolve, reject) => {
            let requestData: any = insuranceMaster.toJS();
            requestData.contactInfo = requestData.Contact;
            requestData.addressInfo = requestData.Address;
            requestData = _.omit(requestData, 'Contact', 'Address');
            return this._http.post(this._url + '/InsuranceMaster/Add', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedInsuranceMaster: InsuranceMaster = null;
                    parsedInsuranceMaster = InsuranceMasterAdapter.parseResponse(data);
                    resolve(parsedInsuranceMaster);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<InsuranceMaster>>Observable.fromPromise(promise);
    }

    updateInsuranceMaster(insuranceMaster: InsuranceMaster): Observable<InsuranceMaster> {
        let promise: Promise<InsuranceMaster> = new Promise((resolve, reject) => {
            let requestData: any = insuranceMaster.toJS();
            requestData.contactInfo = requestData.Contact;
            requestData.addressInfo = requestData.Address;
            requestData = _.omit(requestData, 'Contact', 'Address');
            return this._http.post(this._url + '/InsuranceMaster/Add', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedInsuranceMaster: InsuranceMaster = null;
                    parsedInsuranceMaster = InsuranceMasterAdapter.parseResponse(data);
                    resolve(parsedInsuranceMaster);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<InsuranceMaster>>Observable.fromPromise(promise);
    }

    deleteInsuranceMaster(insuranceMaster: InsuranceMaster): Observable<InsuranceMaster> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/InsuranceMaster/Delete/' + insuranceMaster.id + '/' + this.companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    let parsedInsuranceMaster: InsuranceMaster = null;
                    parsedInsuranceMaster = InsuranceMasterAdapter.parseResponse(data);
                    resolve(parsedInsuranceMaster);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<InsuranceMaster>>Observable.from(promise);
    }
}

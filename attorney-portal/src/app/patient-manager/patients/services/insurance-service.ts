import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { Insurance } from '../models/insurance';
import { InsuranceAdapter } from './adapters/insurance-adapter';
import { InsuranceMaster } from '../models/insurance-master';
import { InsuranceMasterAdapter } from './adapters/insurance-master-adapter';

@Injectable()
export class InsuranceService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/insurance';
    private _headers: Headers = new Headers();

    constructor(private _http: Http, private _sessionStore: SessionStore) {
        this._headers.append('Content-Type', 'application/json');
       
    }
    getInsurance(insuranceId: Number): Observable<Insurance> {
        let promise: Promise<Insurance> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientInsuranceInfo/get/' + insuranceId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    let insurance = null;
                    if (data.length) {
                        insurance = InsuranceAdapter.parseResponse(data);
                        resolve(insurance);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Insurance>>Observable.fromPromise(promise);
    }

    getInsurances(caseId: Number): Observable<Insurance[]> {
        let promise: Promise<Insurance[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientInsuranceInfo/getByCaseId/' + caseId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let insurances = (<Object[]>data).map((data: any) => {
                        return InsuranceAdapter.parseResponse(data);
                    });
                    resolve(insurances);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Insurance[]>>Observable.fromPromise(promise);
    }
    addInsurance(insurance: Insurance): Observable<Insurance> {
        let promise: Promise<Insurance> = new Promise((resolve, reject) => {
            let requestData: any = insurance.toJS();
            requestData.insuranceTypeId = requestData.insuranceType;
            requestData.policyHolderContactInfo = requestData.policyContact;
            requestData.policyHolderAddressInfo = requestData.policyAddress;
            requestData.insuranceCompanyContactInfo = requestData.insuranceContact;
            requestData.insuranceCompanyAddressInfo = requestData.insuranceAddress;
            requestData = _.omit(requestData, 'insuranceType', 'policyContact', 'policyAddress', 'insuranceContact', 'insuranceAddress');
            return this._http.post(this._url + '/PatientInsuranceInfo/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedInsurance: Insurance = null;
                    parsedInsurance = InsuranceAdapter.parseResponse(data);
                    resolve(parsedInsurance);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Insurance>>Observable.fromPromise(promise);
    }
    updateInsurance(insurance: Insurance): Observable<Insurance> {
        let promise = new Promise((resolve, reject) => {
            let requestData: any = insurance.toJS();
            requestData.insuranceTypeId = requestData.insuranceType;
            requestData.policyHolderContactInfo = requestData.policyContact;
            requestData.policyHolderAddressInfo = requestData.policyAddress;
            requestData.insuranceCompanyContactInfo = requestData.insuranceContact;
            requestData.insuranceCompanyAddressInfo = requestData.insuranceAddress;
            requestData = _.omit(requestData, 'insuranceType', 'policyContact', 'policyAddress', 'insuranceContact', 'insuranceAddress');
            return this._http.post(this._url + '/PatientInsuranceInfo/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedInsurance: Insurance = null;
                    parsedInsurance = InsuranceAdapter.parseResponse(data);
                    resolve(parsedInsurance);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Insurance>>Observable.fromPromise(promise);
    }
    deleteInsurance(insurance: Insurance): Observable<Insurance> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientInsuranceInfo/delete/' + insurance.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    let parsedInsurance: Insurance = null;
                    parsedInsurance = InsuranceAdapter.parseResponse(data);
                    resolve(parsedInsurance);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Insurance>>Observable.from(promise);
    }

     getInsuranceMasterById(insuranceMasterId: Number): Observable<InsuranceMaster> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<InsuranceMaster> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/InsuranceMaster/getInsuranceDetails/' + insuranceMasterId + '/' + companyId , {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    let insuranceMaster = null;
                        insuranceMaster = InsuranceMasterAdapter.parseResponse(data);
                        resolve(insuranceMaster);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<InsuranceMaster>>Observable.fromPromise(promise);
    }

    getInsurancesMasterByCompanyId(): Observable<InsuranceMaster[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<InsuranceMaster[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/InsuranceMaster/getMasterAndByCompanyId/' + companyId , {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let insurancesMaster = (<Object[]>data).map((data: any) => {
                        return InsuranceMasterAdapter.parseResponse(data);
                    });
                    resolve(insurancesMaster);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<InsuranceMaster[]>>Observable.fromPromise(promise);
    }
}

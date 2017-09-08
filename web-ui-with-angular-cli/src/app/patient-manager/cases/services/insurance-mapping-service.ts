import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { InsuranceMapping } from '../models/insurance-mapping';
import { InsuranceMappingAdapter } from './adapters/insurance-mapping-adapter';

@Injectable()
export class InsuranceMappingService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(private _http: Http, private _sessionStore: SessionStore) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }
    getInsuranceMapping(insuranceMappingId: Number): Observable<InsuranceMapping> {
        let promise: Promise<InsuranceMapping> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/CaseInsuranceMapping/Get/' + insuranceMappingId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    let insuranceMapping = null;
                    if (data) {
                        insuranceMapping = InsuranceMappingAdapter.parseResponse(data);
                        resolve(insuranceMapping);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<InsuranceMapping>>Observable.fromPromise(promise);
    }

    getInsuranceMappings(caseId: Number): Observable<InsuranceMapping> {
        let promise: Promise<InsuranceMapping> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/CaseInsuranceMapping/getByCaseId/' + caseId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedData: InsuranceMapping = null;
                    parsedData = InsuranceMappingAdapter.parseResponse(data);
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<InsuranceMapping>>Observable.fromPromise(promise);
    }
    addInsuranceMapping(insuranceMapping: InsuranceMapping): Observable<InsuranceMapping> {
        let promise: Promise<InsuranceMapping> = new Promise((resolve, reject) => {
            let requestData: any = insuranceMapping.toJS();
            return this._http.post(environment.SERVICE_BASE_URL + '/CaseInsuranceMapping/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedInsuranceMapping: InsuranceMapping = null;
                    parsedInsuranceMapping = InsuranceMappingAdapter.parseResponse(data);
                    resolve(parsedInsuranceMapping);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<InsuranceMapping>>Observable.fromPromise(promise);
    }
    updateInsuranceMapping(insuranceMapping: InsuranceMapping): Observable<InsuranceMapping> {
        let promise = new Promise((resolve, reject) => {
            let requestData: any = insuranceMapping.toJS();
            return this._http.post(environment.SERVICE_BASE_URL + '/CaseInsuranceMapping/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedInsuranceMapping: InsuranceMapping = null;
                    parsedInsuranceMapping = InsuranceMappingAdapter.parseResponse(data);
                    resolve(parsedInsuranceMapping);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<InsuranceMapping>>Observable.fromPromise(promise);
    }
    deleteInsuranceMapping(insuranceMapping: InsuranceMapping): Observable<InsuranceMapping> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/CaseInsuranceMapping/Delete/' + insuranceMapping.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    if (data) {
                        let parsedInsuranceMapping: InsuranceMapping = null;
                        parsedInsuranceMapping = InsuranceMappingAdapter.parseResponse(data);
                        resolve(parsedInsuranceMapping);
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<InsuranceMapping>>Observable.from(promise);
    }
}

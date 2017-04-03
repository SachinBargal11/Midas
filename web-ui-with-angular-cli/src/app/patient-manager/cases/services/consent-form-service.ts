

//import { Accident } from '../models/accident';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { AddConsent } from '../models/add-consent-form';
import { AddConsentAdapter } from './adapters/add-consent-form-adapter';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';


@Injectable()
export class AddConsentFormService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getdoctors(CompanyId: Number): Observable<AddConsentAdapter> {

        let promise: Promise<AddConsentAdapter> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Doctor/getByCompanyId/' + CompanyId).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    if (data.length) {
                        resolve(data);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<AddConsentAdapter>>Observable.fromPromise(promise);
    }

    Save(consentDetail: AddConsent): Observable<AddConsent> {       
        let promise: Promise<AddConsent> = new Promise((resolve, reject) => {
            let caseRequestData = consentDetail.toJS();

            return this._http.post(this._url + '/DoctorCaseConsentApproval/save', JSON.stringify(caseRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: AddConsent = null;
                    parsedCase = AddConsentAdapter.parseResponse(data);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<AddConsent>>Observable.fromPromise(promise);

    }

    getDocumentsForCaseId(caseId: number): Observable<AddConsent[]> {
        let promise: Promise<AddConsent[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DoctorCaseConsentApproval/getByCaseId/' + caseId )
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let document = (<Object[]>data).map((data: any) => {
                        return AddConsentAdapter.parseResponse(data);
                    });
                    resolve(document);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<AddConsent[]>>Observable.fromPromise(promise);
    }


    getDoctorCaseConsentApproval(Id: Number): Observable<AddConsent[]> {      
        let promise: Promise<AddConsent[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DoctorCaseConsentApproval/get/' +Id)
                .map(res => res.json())
                .subscribe((data) => {
                    let docData =  AddConsentAdapter.parseResponse(data);
                    resolve(docData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<AddConsent[]>>Observable.fromPromise(promise);
    }
}
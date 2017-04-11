

//import { Accident } from '../models/accident';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { ListConsent } from '../models/list-consent-form';
import { ListConsentAdapter } from './adapters/list-consent-form-adapter';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';


@Injectable()
export class ListConsentFormService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();
    private companyId: number;

    constructor(private _http: Http,
        private _sessionStore: SessionStore,
    ) {
        this._headers.append('Content-Type', 'application/json');
        
    }

    getConsetForm(CaseId: number,companyId:number): Observable<ListConsent[]> {//DoctorCaseConsentApproval/getByCaseId      
        let promise: Promise<ListConsent[]> = new Promise((resolve, reject) => {
            // return this._http.get(this._url + '/fileupload/get/' + CaseId  +'/case').map(res => res.json())
            // return this._http.get(this._url + '/CompanyCaseConsentApproval/getByCaseId/' + CaseId).map(res => res.json())

            return this._http.get(this._url + '/fileupload/get/' + CaseId + '/consent' + '_'+companyId).map(res => res.json())
                //fileupload/get/86/consent
                .subscribe((data: Array<any>) => {
                    let Consent = null;
                    if (data.length) {
                        Consent = ListConsentAdapter.parseResponse(data);
                        resolve(data);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ListConsent[]>>Observable.fromPromise(promise);
    }

    deleteConsentform(caseDetail: ListConsent): Observable<ListConsent> {
        let promise = new Promise((resolve, reject) => {
            // return this._http.get(this._url + '/CompanyCaseConsentApproval/delete/' + caseDetail.id, {
            return this._http.get(this._url + '/fileupload/delete/' + caseDetail.id + '/' + caseDetail.documentId, {

                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: ListConsent = null;
                    parsedCase = ListConsentAdapter.parseResponse(data);
                    // deleteUploadConsentform(caseDetail);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        });

        // let promise1 = new Promise((resolve, reject) => {
        //     return this._http.get(this._url + '/CompanyCaseConsentApproval/delete/' + caseDetail.id, {
        //         //return this._http.get(this._url + '/fileupload/delete/' + caseDetail.id + '/' + caseDetail.documentId, {

        //         headers: this._headers
        //     }).map(res => res.json())
        //         .subscribe((data: any) => {
        //             let parsedCase: ListConsent = null;
        //             parsedCase = ListConsentAdapter.parseResponse(data);
        //             // deleteUploadConsentform(caseDetail);
        //             resolve(parsedCase);
        //         }, (error) => {
        //             reject(error);
        //         });
        // });


        return <Observable<ListConsent>>Observable.from(promise);
    }

    deleteUploadConsentform(caseDetail: ListConsent): Observable<ListConsent> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/CompanyCaseConsentApproval/delete/' + caseDetail.id + '/' + caseDetail.documentId + '/' + caseDetail.caseId, {

                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: ListConsent = null;
                    parsedCase = ListConsentAdapter.parseResponse(data);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ListConsent>>Observable.from(promise);
    }

    DownloadConsentForm(CaseId: Number): Observable<ListConsent[]> {//DoctorCaseConsentApproval/getByCaseId
        let promise: Promise<ListConsent[]> = new Promise((resolve, reject) => {
            // return this._http.get(this._url + '/fileupload/get/' + CaseId  +'/case').map(res => res.json())
            return this._http.get(this._url + '/fileupload/download/' + CaseId + '/' + 0).map(res => res.json())

                .subscribe((data: Array<any>) => {
                    let Consent = null;
                    if (data.length) {
                        Consent = ListConsentAdapter.parseResponse(data);
                        resolve(data);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ListConsent[]>>Observable.fromPromise(promise);
    }
}
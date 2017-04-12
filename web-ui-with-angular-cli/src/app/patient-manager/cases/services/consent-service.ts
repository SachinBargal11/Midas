import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Consent } from '../models/consent';
import { ConsentAdapter } from './adapters/consent-adapter';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';

@Injectable()
export class ConsentService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getdoctors(CompanyId: Number): Observable<ConsentAdapter> {
        let promise: Promise<ConsentAdapter> = new Promise((resolve, reject) => {
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
        return <Observable<ConsentAdapter>>Observable.fromPromise(promise);
    }

    Save(consentDetail: Consent): Observable<Consent> {
        let promise: Promise<Consent> = new Promise((resolve, reject) => {
            let caseRequestData = consentDetail.toJS();

            return this._http.post(this._url + '/CompanyCaseConsentApproval/save', JSON.stringify(caseRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: Consent = null;
                    parsedCase = ConsentAdapter.parseResponse(data);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Consent>>Observable.fromPromise(promise);

    }

    getDocumentsForCaseId(caseId: number): Observable<Consent[]> {
        let promise: Promise<Consent[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/CompanyCaseConsentApproval/getByCaseId/' + caseId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let document = (<Object[]>data).map((data: any) => {
                        return ConsentAdapter.parseResponse(data);
                    });
                    resolve(document);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }


    getDoctorCaseConsentApproval(Id: Number): Observable<Consent[]> {
        let promise: Promise<Consent[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/CompanyCaseConsentApproval/get/' + Id)
                .map(res => res.json())
                .subscribe((data) => {
                    let docData = ConsentAdapter.parseResponse(data);
                    resolve(docData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }

    uploadScannedDocuments(dwObject: any, currentCaseId: number): Observable<Consent[]> {
        let promise: Promise<Consent[]> = new Promise((resolve, reject) => {
            dwObject.IfSSL = false; // Set whether SSL is used
            dwObject.HTTPPort = 80;
            dwObject.HttpFieldNameOfUploadedImage = 'demo[]';
            // dwObject.SaveAsPDF(`C:\\Users\\Mitali\\Downloads\\scanned_file_${currentCaseId}.pdf`);
            dwObject.HTTPUploadAllThroughPostAsPDF(
                // 'midas.codearray.tk',
                this._url,
                'fileupload/multiupload/' + currentCaseId + '/consent',
                `scanned_file_${currentCaseId}.pdf`,
                (response: any) => {
                    resolve(response);
                },
                (errorCode: string, errorString: string, response: any) => {
                    let responseData: any = JSON.parse(response);
                    let documents: any = (<Object[]>responseData).map((document: any) => {
                        return ConsentAdapter.parseResponse(document);
                    });
                    resolve(documents);
                    // reject(new Error(errorString));
                });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }


    getConsetForm(CaseId: number, companyId: number): Observable<Consent[]> {
        debugger;
        let promise: Promise<Consent[]> = new Promise((resolve, reject) => {
            // return this._http.get(this._url + '/fileupload/get/' + CaseId  +'/case').map(res => res.json())
            // return this._http.get(this._url + '/CompanyCaseConsentApproval/getByCaseId/' + CaseId).map(res => res.json())

            return this._http.get(this._url + '/fileupload/get/' + CaseId + '/consent' + '_' + companyId).map(res => res.json())
                //fileupload/get/86/consent
                .subscribe((data: Array<any>) => {
                    let Consent = null;
                    if (data.length) {
                        Consent = ConsentAdapter.parseResponse(data);
                        resolve(data);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }

    deleteConsentform(caseDetail: Consent, companyId: number): Observable<Consent> {
        let promise = new Promise((resolve, reject) => {
            // return this._http.get(this._url + '/CompanyCaseConsentApproval/delete/' + caseDetail.id, {
            return this._http.get(this._url + '/CompanyCaseConsentApproval/delete/' + caseDetail.id + '/' + caseDetail.documentId + '/' + companyId, {

                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: Consent = null;
                    parsedCase = ConsentAdapter.parseResponse(data);
                    // deleteUploadConsentform(caseDetail);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        }); 
        return <Observable<Consent>>Observable.from(promise);
    }

    deleteUploadConsentform(caseDetail: Consent): Observable<Consent> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/CompanyCaseConsentApproval/delete/' + caseDetail.id + '/' + caseDetail.documentId + '/' + caseDetail.caseId, {

                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: Consent = null;
                    parsedCase = ConsentAdapter.parseResponse(data);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Consent>>Observable.from(promise);
    }

    DownloadConsentForm(CaseId: Number): Observable<Consent[]> {//DoctorCaseConsentApproval/getByCaseId
        let promise: Promise<Consent[]> = new Promise((resolve, reject) => {
            // return this._http.get(this._url + '/fileupload/get/' + CaseId  +'/case').map(res => res.json())
            return this._http.get(this._url + '/fileupload/download/' + CaseId + '/' + 0).map(res => res.json())

                .subscribe((data: Array<any>) => {
                    let Consent = null;
                    if (data.length) {
                        Consent = ConsentAdapter.parseResponse(data);
                        resolve(data);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }


}
import { CaseAdapter } from './adapters/case-adapter';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Consent } from '../models/consent';
import { Case } from '../models/case';
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
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getdoctors(CompanyId: Number): Observable<ConsentAdapter> {
        let promise: Promise<ConsentAdapter> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Doctor/getByCompanyId/' + CompanyId, {
                headers: this._headers
            }).map(res => res.json())
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

            return this._http.post(environment.SERVICE_BASE_URL + '/CompanyCaseConsentApproval/save', JSON.stringify(caseRequestData), {
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
            return this._http.get(environment.SERVICE_BASE_URL + '/CompanyCaseConsentApproval/getByCaseId/' + caseId, {
                headers: this._headers
            })
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
            return this._http.get(environment.SERVICE_BASE_URL + '/CompanyCaseConsentApproval/get/' + Id, {
                headers: this._headers
            })
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
                environment.SERVICE_BASE_URL,
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


    getConsetForm(CaseId: number, companyId: number): Observable<Case> {
        let promise: Promise<Case> = new Promise((resolve, reject) => {
            // return this._http.get(environment.SERVICE_BASE_URL + '/documentmanager/get/' + CaseId  +'/case').map(res => res.json())
            // return this._http.get(environment.SERVICE_BASE_URL + '/CompanyCaseConsentApproval/getByCaseId/' + CaseId).map(res => res.json())

            //changed on 11-4-2017
            // return this._http.get(environment.SERVICE_BASE_URL + '/documentmanager/get/' + CaseId + '/consent' + '_' + companyId).map(res => res.json())
            //documentmanager/get/86/consent

            //changedapi on 13-4-2017 at 1pm
            return this._http.get(environment.SERVICE_BASE_URL + '/case/GetConsentList/' + CaseId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let consent = null;
                    // consent = ConsentAdapter.parseResponse(data);
                    // resolve(data);
                    consent = ConsentAdapter.parseResponse(data);
                    resolve(consent);

                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Case>>Observable.fromPromise(promise);
    }

    deleteConsent(caseDetail: Consent, companyId: number): Observable<Consent> {
        let promise = new Promise((resolve, reject) => {
            // return this._http.get(environment.SERVICE_BASE_URL + '/CompanyCaseConsentApproval/delete/' + caseDetail.id, {
            return this._http.get(environment.SERVICE_BASE_URL + '/CompanyCaseConsentApproval/delete/' + caseDetail.id + '/' + caseDetail.documentId + '/' + companyId, {

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
    deleteCompanyConsent(caseDetail: Case, companyId: number): Observable<Case> {
        let promise = new Promise((resolve, reject) => {
            let requestData = caseDetail.toJS();
            let caseId = requestData.id;
            let documentId: number = 0;
            let companyId: number = 0;
            requestData.caseCompanyConsentDocument.forEach(element => {
                documentId = element.document.originalResponse.midasDocumentId;
                companyId = element.document.originalResponse.companyId;
            });
            requestData.caseCompanyConsentDocument
            return this._http.get(environment.SERVICE_BASE_URL + '/CompanyCaseConsentApproval/delete/' + caseId + '/' + documentId + '/' + companyId, {

                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: Case = null;
                    parsedCase = CaseAdapter.parseResponse(data);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Case>>Observable.from(promise);
    }

    deleteUploadConsentform(caseDetail: Consent): Observable<Consent> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/CompanyCaseConsentApproval/delete/' + caseDetail.id + '/' + caseDetail.documentId + '/' + caseDetail.caseId, {

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

    getcompany(CaseId: Number): Observable<ConsentAdapter> {
        let promise: Promise<ConsentAdapter> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Case/getCaseCompanies/' + CaseId, {
                headers: this._headers
            }).map(res => res.json())
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

    downloadConsentForm(documentId: Number, companyId: Number): Observable<Consent[]> {
        let thefile = {};
        //   let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<Consent[]> = new Promise((resolve, reject) => {
            this._http
                .get(environment.SERVICE_BASE_URL + '/documentmanager/downloadfromblob/' + companyId + '/' + documentId, {
                    headers: this._headers
                })
                .map(res => {
                    // If request fails, throw an Error that will be caught
                    if (res.status < 200 || res.status == 500 || res.status == 404) {
                        throw new Error('This request has failed ' + res.status);
                    }
                    // If everything went fine, return the response
                    else {

                        window.location.assign(environment.SERVICE_BASE_URL +'/documentmanager/downloadfromblob/' + companyId + '/' + documentId);
                        // return res.arrayBuffer();
                    }
                })
                .subscribe(data => thefile = new Blob([data], { type: "application/octet-stream" }),
                (error) => {
                    reject(error);
                    console.log("Error downloading the file.")

                },
                () => console.log('Completed file download.'));
            //window.location.assign(environment.SERVICE_BASE_URL + '/fileupload/download/' + CaseId + '/' + documentId);
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }


    downloadTemplate(CaseId: Number, CompanyId: Number): Observable<Consent[]> {
        let thefile = {};
        let promise: Promise<Consent[]> = new Promise((resolve, reject) => {
            this._http
                .get(environment.SERVICE_BASE_URL + '/CompanyCaseConsentApproval/download/' + CaseId + '/' + CompanyId, {
                    headers: this._headers
                })
                .map(res => {
                    // If request fails, throw an Error that will be caught
                    if (res.status < 200 || res.status == 500 || res.status == 404) {
                        throw new Error('This request has failed ' + res.status);
                    }
                    // If everything went fine, return the response
                    else {

                        window.location.assign(environment.SERVICE_BASE_URL + '/CompanyCaseConsentApproval/download/' + CaseId + '/' + CompanyId);
                        // return res.arrayBuffer();
                    }
                })
                .subscribe(data => thefile = new Blob([data], { type: "application/octet-stream" }),
                (error) => {
                    reject(error);
                    console.log("Error downloading the file.")

                },
                () => console.log('Completed file download.'));
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }

    getConsentFormDownloadUrl(caseId: Number, companyId: Number, download: Boolean = true): string {
        return `${environment.SERVICE_BASE_URL}/CompanyCaseConsentApproval/download/${caseId}/${companyId}`;
    }
}
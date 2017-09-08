import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { Case } from '../models/case';
import { CaseDocument } from '../models/case-document';
import { SessionStore } from '../../../commons/stores/session-store';
import { CaseAdapter } from './adapters/case-adapter';
import { CaseDocumentAdapter } from './adapters/case-document-adapters';
import { Document } from '../../../commons/models/document';
import * as _ from 'underscore';
import { Consent } from '../models/consent';
import { CaseLabelAdapter } from './adapters/case-label-adapters';
import { CaseLabel } from '../models/case-label';

@Injectable()
export class CaseService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/cases';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getCase(caseId: Number): Observable<Case> {
        let promise: Promise<Case> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Case/get/' + caseId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let cases = null;
                    if (data) {
                        cases = CaseAdapter.parseResponse(data);
                        resolve(cases);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Case>>Observable.fromPromise(promise);
    }

     getCaseReadOnly(caseId: Number,companyId): Observable<CaseLabel> {
        let promise: Promise<CaseLabel> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/case/getReadOnly/' + caseId + '/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let caseLabel = null;
                    if (data) {
                        caseLabel = CaseLabelAdapter.parseResponse(data);
                        resolve(caseLabel);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<CaseLabel>>Observable.fromPromise(promise);
    }

    getOpenCaseForPatient(patientId: Number): Observable<Case[]> {
        let promise: Promise<Case[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Case/getOpenCaseForPatient/' + patientId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let cases = (<Object[]>data).map((data: any) => {
                        return CaseAdapter.parseResponse(data);
                    });
                    resolve(cases);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Case[]>>Observable.fromPromise(promise);
    }



    getCases(patientId: number): Observable<Case[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<Case[]> = new Promise((resolve, reject) => {
            // return this._http.get(environment.SERVICE_BASE_URL + '/Case/getByPatientId/' + patientId)
            return this._http.get(environment.SERVICE_BASE_URL + '/Case/getByPatientIdAndCompanyId/' + patientId + '/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let cases = (<Object[]>data).map((data: any) => {
                        return CaseAdapter.parseResponse(data);
                    });
                    resolve(cases);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Case[]>>Observable.fromPromise(promise);
    }
    getCasesByCompany(companyId: number): Observable<Case[]> {
        let promise: Promise<Case[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Case/getByCompanyId/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let cases = (<Object[]>data).map((data: any) => {
                        return CaseAdapter.parseCaseComapnyResponse(data);
                    });
                    resolve(cases);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Case[]>>Observable.fromPromise(promise);
    }
    getCasesByCompanyAndDoctorId(companyId: number): Observable<Case[]> {
        let doctorId = this._sessionStore.session.user.id;
        let promise: Promise<Case[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Case/getByCompanyAndDoctorId/' + companyId + '/' + doctorId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let cases = (<Object[]>data).map((data: any) => {
                        return CaseAdapter.parseCaseComapnyResponse(data);
                    });
                    resolve(cases);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Case[]>>Observable.fromPromise(promise);
    }

    getDocumentsForCaseId(caseId: number): Observable<CaseDocument[]> {
        let promise: Promise<CaseDocument[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/documentmanager/get/' + caseId + '/case', {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let document = (<Object[]>data).map((data: any) => {
                        return CaseDocumentAdapter.parseResponse(data);
                    });
                    resolve(document);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<CaseDocument[]>>Observable.fromPromise(promise);
    }
    getDocumentForCaseId(caseId: number): Observable<Case> {
        let promise: Promise<Case> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/case/GetConsentList/' + caseId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let document: Case = null
                    document = CaseAdapter.parseResponse(data);
                    resolve(document);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Case>>Observable.fromPromise(promise);
    }

    uploadDocumentsForCase(CaseDocument: CaseDocument[], currentCaseId: number): Observable<CaseDocument[]> {
        let promise: Promise<CaseDocument[]> = new Promise((resolve, reject) => {
            // let requestData = _.extend(CaseDocument.toJS());
            // requestData = _.omit(requestData, 'caseId');
            return this._http.post(environment.SERVICE_BASE_URL + '/fileupload/multiupload/' + currentCaseId + '/case', JSON.stringify(CaseDocument), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCaseDocuments: CaseDocument = null;
                    parsedCaseDocuments = CaseDocumentAdapter.parseResponse(data);
                    resolve(parsedCaseDocuments);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<CaseDocument[]>>Observable.fromPromise(promise);
    }

    /*uploadScannedDocuments(dwObject: any, currentCaseId: number): Observable<CaseDocument[]> {
        let promise: Promise<CaseDocument[]> = new Promise((resolve, reject) => {
            dwObject.IfSSL = false; // Set whether SSL is used
            dwObject.HTTPPort = 80;
            dwObject.HttpFieldNameOfUploadedImage = 'demo[]';
            dwObject.HTTPUploadAllThroughPostAsPDF(
                // 'midas.codearray.tk',
                environment.SERVICE_BASE_URL,
                'fileupload/multiupload/' + currentCaseId + '/case',
                `scanned_file_${currentCaseId}.pdf`,
                (response: any) => {
                    resolve(response);
                },
                (errorCode: string, errorString: string, response: any) => {
                    let responseData: any = JSON.parse(response);
                    let documents: CaseDocument[] = (<Object[]>responseData).map((document: any) => {
                        return CaseDocumentAdapter.parseResponse(document);
                    });
                    resolve(documents);
                    // reject(new Error(errorString));
                });
        });
        return <Observable<CaseDocument[]>>Observable.fromPromise(promise);
    }*/

    addCase(caseDetail: Case): Observable<Case> {
        let promise: Promise<Case> = new Promise((resolve, reject) => {
            let caseRequestData = caseDetail.toJS();
            // let caseCompanyMapping = [{
            //     company: {
            //         id: this._sessionStore.session.currentCompany.id
            //     }
            // }];
            // caseRequestData.caseCompanyMapping = caseCompanyMapping;
            return this._http.post(environment.SERVICE_BASE_URL + '/Case/Save', JSON.stringify(caseRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: Case = null;
                    parsedCase = CaseAdapter.parseResponse(data);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Case>>Observable.fromPromise(promise);

    }

    updateCase(caseDetail: Case): Observable<Case> {
        let promise = new Promise((resolve, reject) => {
            let caseRequestData = caseDetail.toJS();
            let caseCompanyMapping = [{
                company: {
                    id: this._sessionStore.session.currentCompany.id
                }
            }];
            caseRequestData.caseCompanyMapping = caseCompanyMapping;
            return this._http.post(environment.SERVICE_BASE_URL + '/Case/Save', JSON.stringify(caseRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: Case = null;
                    parsedCase = CaseAdapter.parseResponse(data);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Case>>Observable.fromPromise(promise);

    }

    deleteCase(caseDetail: Case): Observable<Case> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Case/delete/' + caseDetail.id, {
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
    deleteDocument(caseDocument: CaseDocument): Observable<Case> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/fileupload/delete/' + caseDocument.caseId + '/' + caseDocument.document.documentId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCaseDocument: CaseDocument = null;
                    parsedCaseDocument = CaseDocumentAdapter.parseResponse(data);
                    resolve(parsedCaseDocument);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Case>>Observable.from(promise);
    }

    downloadDocumentForm(CaseId: Number, documentId: Number): Observable<Consent[]> {
        let thefile = {};
        let companyId = this._sessionStore.session.currentCompany.id;
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

                        window.location.assign(environment.SERVICE_BASE_URL + '/documentmanager/downloadfromblob/' + companyId + '/' + documentId);
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

     getOpenCaseForPatientByPatientIdAndCompanyId(patientId: Number): Observable<Case[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<Case[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Case/getOpenCaseForPatient/' + patientId + '/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let cases = (<Object[]>data).map((data: any) => {
                        return CaseAdapter.parseResponse(data);
                    });
                    resolve(cases);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Case[]>>Observable.fromPromise(promise);
    }
}


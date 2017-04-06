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
import * as _ from 'underscore';

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
    }

    getCase(caseId: Number): Observable<Case> {
        let promise: Promise<Case> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Case/get/' + caseId).map(res => res.json())
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

    getCases(patientId: number): Observable<Case[]> {
        let promise: Promise<Case[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Case/getByPatientId/' + patientId)
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
            return this._http.get(this._url + '/Case/getByCompanyId/' + companyId)
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
            return this._http.get(this._url + '/Case/getByCompanyAndDoctorId/' + companyId + '/' + doctorId)
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
            return this._http.get(this._url + '/fileupload/get/' + caseId + '/case')
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


    uploadDocumentsForCase(CaseDocument: CaseDocument[], currentCaseId: number): Observable<CaseDocument[]> {
        let promise: Promise<CaseDocument[]> = new Promise((resolve, reject) => {
            // let requestData = _.extend(CaseDocument.toJS());
            // requestData = _.omit(requestData, 'caseId');
            return this._http.post(this._url + '/fileupload/multiupload/' + currentCaseId + '/case', JSON.stringify(CaseDocument), {
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

    uploadScannedDocuments(dwObject: any, currentCaseId: number): Observable<CaseDocument[]> {
        let promise: Promise<CaseDocument[]> = new Promise((resolve, reject) => {
            dwObject.IfSSL = false; // Set whether SSL is used
            dwObject.HTTPPort = 80;
            dwObject.HttpFieldNameOfUploadedImage = 'demo[]';
            // dwObject.SaveAsPDF(`C:\\Users\\Mitali\\Downloads\\scanned_file_${currentCaseId}.pdf`);
            dwObject.HTTPUploadAllThroughPostAsPDF(
                // 'midas.codearray.tk',
                this._url,
                'fileupload/multiupload/' + currentCaseId + '/case',
                `scanned_file_${currentCaseId}.pdf`,
                (response: any) => {
                    resolve(response);
                },
                (errorCode: string, errorString: string, response: any) => {
                    reject(new Error(errorString));
                });
        });
        return <Observable<CaseDocument[]>>Observable.fromPromise(promise);


        /*let promise: Promise<CaseDocument[]> = new Promise((resolve, reject) => {
            debugger;
            dwObject.IfSSL = true; // Set whether SSL is used
            dwObject.HTTPPort = 80;
            dwObject.HTTPUploadAllThroughPostAsPDF(
                'www.dynamsoft.com',
                'Demo/DWT/SaveToDB.aspx',
                `scanned_file_${currentCaseId}.pdf`,
                (response: any) => {
                    resolve(response);
                },
                (errorCode: string, errorString: string, response: any) => {
                    reject(new Error(errorString));
                });
        });
        return <Observable<CaseDocument[]>>Observable.fromPromise(promise);*/

    }

    addCase(caseDetail: Case): Observable<Case> {
        let promise: Promise<Case> = new Promise((resolve, reject) => {
            let caseRequestData = caseDetail.toJS();
            let caseCompanyMapping = [{
                company: {
                    id: this._sessionStore.session.currentCompany.id
                }
            }];
            caseRequestData.caseCompanyMapping = caseCompanyMapping;
            return this._http.post(this._url + '/Case/Save', JSON.stringify(caseRequestData), {
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
            return this._http.post(this._url + '/Case/Save', JSON.stringify(caseRequestData), {
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
            return this._http.get(this._url + '/Case/delete/' + caseDetail.id, {
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
    deleteDocument(caseDetail: CaseDocument): Observable<Case> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/fileupload/delete/' + caseDetail.id + '/' + caseDetail.documentId, {
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
}


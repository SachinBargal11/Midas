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
import { Company } from '../../../account/models/company';
import { CompanyAdapter } from '../../../account/services/adapters/company-adapter';
import * as _ from 'underscore';
import { Consent } from '../models/consent';

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
            return this._http.get(this._url + '/documentmanager/get/' + caseId + '/case')
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


 //this is for compney consent list.
    getDocumentForCompneyCaseId(patientId: number): Observable<Case[]> {
        let promise: Promise<Case[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Case/getOpenCaseForPatient/' + patientId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let document = (<Object[]>data).map((data: any) => {
                    return CaseAdapter.parseResponse(data);
                    });
                    resolve(document);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Case[]>>Observable.fromPromise(promise);
    }
    getCaseCompanies(caseId: number): Observable<Company[]> {
        let promise: Promise<Company[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Case/getCaseCompanies/' + caseId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let companies = (<Object[]>data).map((data: any) => {
                    return CompanyAdapter.parseResponse(data);
                    });
                    resolve(companies);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Company[]>>Observable.fromPromise(promise);
    }

     getDocumentForCaseId(caseId: number): Observable<Case> {
        let promise: Promise<Case> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/case/GetConsentList/' + caseId)
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

    /*uploadScannedDocuments(dwObject: any, currentCaseId: number): Observable<CaseDocument[]> {
        let promise: Promise<CaseDocument[]> = new Promise((resolve, reject) => {
            dwObject.IfSSL = false; // Set whether SSL is used
            dwObject.HTTPPort = 80;
            dwObject.HttpFieldNameOfUploadedImage = 'demo[]';
            dwObject.HTTPUploadAllThroughPostAsPDF(
                // 'midas.codearray.tk',
                this._url,
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
    deleteDocument(caseDocument: CaseDocument): Observable<Case> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/fileupload/delete/' + caseDocument.caseId + '/' + caseDocument.document.documentId, {
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
                .get(this._url + '/documentmanager/downloadfromnoproviderblob/' + documentId, {
                headers: this._headers
            })
                .map(res => {
                    // If request fails, throw an Error that will be caught
                    if (res.status < 200 || res.status == 500 || res.status == 404) {
                        throw new Error('This request has failed ' + res.status);
                    }
                    // If everything went fine, return the response
                    else {

                        window.location.assign(this._url + '/documentmanager/downloadfromnoproviderblob/' + documentId);
                        // return res.arrayBuffer();
                    }
                })
                .subscribe(data => thefile = new Blob([data], { type: "application/octet-stream" }),
                (error) => {
                    reject(error);
                    console.log("Error downloading the file.")

                },
                () => console.log('Completed file download.'));
            //window.location.assign(this._url + '/fileupload/download/' + CaseId + '/' + documentId);
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }
}


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Consent } from '../models/consent';
import { CaseDocument } from '../models/case-document';
import { ConsentService } from '../services/consent-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class ConsentStore {

    private _consent: BehaviorSubject<List<Consent>> = new BehaviorSubject(List([]));
    private _caseDocument: BehaviorSubject<List<CaseDocument>> = new BehaviorSubject(List([]));

    constructor(
        private _consentFormService: ConsentService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._consent.next(this._consent.getValue().clear());
        this._caseDocument.next(this._caseDocument.getValue().clear());
    }

    get doctors() {
        return this._consent.asObservable();
    }

    getdoctors(patientId: Number): Observable<Consent[]> {

        let promise = new Promise((resolve, reject) => {
            this._consentFormService.getdoctors(patientId).subscribe((doctors: Consent[]) => {
                this._consent.next(List(doctors));
                resolve(doctors);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }


    Save(consentDetail: Consent): Observable<Consent> {
        let promise = new Promise((resolve, reject) => {
            this._consentFormService.Save(consentDetail).subscribe((consentDetail: Consent) => {
                this._consent.next(this._consent.getValue().push(consentDetail));
                resolve(consentDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent>>Observable.from(promise);
    }

    getDocumentsForCaseId(caseId: number): Observable<Consent[]> {
        let promise = new Promise((resolve, reject) => {
            this._consentFormService.getDocumentsForCaseId(caseId).subscribe((documents: Consent[]) => {
                resolve(documents);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }


    findById(id: number) {
        let editConsent = this._consent.getValue();
        let index = editConsent.findIndex((currentId: Consent) => currentId.id === id);
        return editConsent.get(index);
    }


    editDoctorCaseConsentApproval(id: number): Observable<Consent> {
        let promise = new Promise((resolve, reject) => {
            // let matchedDoctorConsent: Consent = this.findById(id);
            // if (matchedDoctorConsent) {
            //     resolve(matchedDoctorConsent);
            // } else {
            this._consentFormService.getDoctorCaseConsentApproval(id).subscribe((editConsent: Consent[]) => {
                resolve(editConsent);
            }, error => {
                reject(error);
            });
            //}
        });
        return <Observable<Consent>>Observable.fromPromise(promise);
    }

    uploadScannedDocuments(dwObject: any, currentCaseId: number): Observable<Consent[]> {
        let promise = new Promise((resolve, reject) => {
            this._consentFormService.uploadScannedDocuments(dwObject, currentCaseId).subscribe((DocumentsDetail: Consent[]) => {
                resolve(DocumentsDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.from(promise);
    }


    getConsetForm(CaseId: number, companyId: number): Observable<Consent[]> {

        let promise = new Promise((resolve, reject) => {
            this._consentFormService.getConsetForm(CaseId, companyId).subscribe((consent: Consent[]) => {
                this._consent.next(List(consent));
                resolve(consent);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }

    deleteConsent(caseDocument: CaseDocument, companyId: number): Observable<CaseDocument> {
        let caseDocuments = this._caseDocument.getValue();
        let index = caseDocuments.findIndex((currentCaseDocument: CaseDocument) => currentCaseDocument.document.originalResponse.midasDocumentId === caseDocument.document.originalResponse.midasDocumentId);
        let promise = new Promise((resolve, reject) => {
            this._consentFormService.deleteConsentform(caseDocument, companyId).subscribe((caseDocument: CaseDocument) => {
                this._caseDocument.next(caseDocuments.delete(index));
                resolve(caseDocument);
            }, error => {
                reject(error);
            });
        });
        return <Observable<CaseDocument>>Observable.from(promise);
    }


    deleteUploadConsetForm(caseDetail: Consent): Observable<Consent> {
        let cases = this._consent.getValue();
        let index = cases.findIndex((currentCase: Consent) => currentCase.id === caseDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._consentFormService.deleteUploadConsentform(caseDetail).subscribe((caseDetail: Consent) => {
                this._consent.next(cases.delete(index));
                resolve(caseDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent>>Observable.from(promise);
    }

    downloadConsentForm(CaseId: Number, documentId: Number): Observable<Consent[]> {
        let promise = new Promise((resolve, reject) => {
            this._consentFormService.downloadConsentForm(CaseId, documentId).subscribe((consent: Consent[]) => {
                this._consent.next(List(consent));
                resolve(consent);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }

    downloadTemplate(CaseId: Number, CompanyId: Number): Observable<Consent[]> {
        let promise = new Promise((resolve, reject) => {
            this._consentFormService.downloadTemplate(CaseId, CompanyId).subscribe((consent: Consent[]) => {
                this._consent.next(List(consent));
                resolve(consent);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }
    // downloadConsentTemplate(company: any, patientDetail: any): Observable<Consent[]> {
    //     let promise = new Promise((resolve, reject) => {
    //         this._consentFormService.downloadConsentTemplate(company, patientDetail).subscribe((consent: Consent[]) => {
    //             this._consent.next(List(consent));
    //             resolve(consent);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<Consent[]>>Observable.fromPromise(promise);
    // }
}

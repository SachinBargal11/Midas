import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Consent } from '../models/consent';
import { Case } from '../models/case';
import { ConsentService } from '../services/consent-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class ConsentStore {

    private _Consent: BehaviorSubject<List<Consent>> = new BehaviorSubject(List([]));

    constructor(
        private _ConsentFormService: ConsentService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._Consent.next(this._Consent.getValue().clear());
    }

    get doctors() {
        return this._Consent.asObservable();
    }

    getdoctors(patientId: Number): Observable<Consent[]> {
        let promise = new Promise((resolve, reject) => {
            this._ConsentFormService.getdoctors(patientId).subscribe((doctors: Consent[]) => {
                this._Consent.next(List(doctors));
                resolve(doctors);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }


    Save(consentDetail: Consent): Observable<Consent> {
        let promise = new Promise((resolve, reject) => {
            this._ConsentFormService.Save(consentDetail).subscribe((consentDetail: Consent) => {
                this._Consent.next(this._Consent.getValue().push(consentDetail));
                resolve(consentDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent>>Observable.from(promise);
    }

    getDocumentsForCaseId(caseId: number): Observable<Consent[]> {
        let promise = new Promise((resolve, reject) => {
            this._ConsentFormService.getDocumentsForCaseId(caseId).subscribe((documents: Consent[]) => {
                resolve(documents);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }


    findById(id: number) {
        let editConsent = this._Consent.getValue();
        let index = editConsent.findIndex((currentId: Consent) => currentId.id === id);
        return editConsent.get(index);
    }


    editDoctorCaseConsentApproval(id: number): Observable<Consent> {
        let promise = new Promise((resolve, reject) => {
            // let matchedDoctorConsent: Consent = this.findById(id);
            // if (matchedDoctorConsent) {
            //     resolve(matchedDoctorConsent);
            // } else {
            this._ConsentFormService.getDoctorCaseConsentApproval(id).subscribe((editConsent: Consent[]) => {
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
            this._ConsentFormService.uploadScannedDocuments(dwObject, currentCaseId).subscribe((DocumentsDetail: Consent[]) => {
                resolve(DocumentsDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.from(promise);
    }


    //   getConsetForm(CaseId: number,companyId: number): Observable<Consent[]> {

    //         let promise = new Promise((resolve, reject) => {
    //             this._ConsentFormService.getConsetForm(CaseId,companyId).subscribe((consent: Consent[]) => {
    //                 this._Consent.next(List(consent));
    //                 resolve(consent);
    //             }, error => {
    //                 reject(error);
    //             });
    //         });
    //         return <Observable<Consent[]>>Observable.fromPromise(promise);
    //     }

    deleteConsetForm(caseDetail: Consent, companyId: number): Observable<Consent> {
        let cases = this._Consent.getValue();
        let index = cases.findIndex((currentCase: Consent) => currentCase.id === caseDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._ConsentFormService.deleteConsent(caseDetail, companyId).subscribe((caseDetail: Consent) => {
                this._Consent.next(cases.delete(index));
                resolve(caseDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent>>Observable.from(promise);
    }
    deleteCompanyConsent(caseDetail: Case, companyId: number): Observable<Case> {
        let promise = new Promise((resolve, reject) => {
            this._ConsentFormService.deleteCompanyConsent(caseDetail, companyId).subscribe((caseDetail: Case) => {
                resolve(caseDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Case>>Observable.from(promise);
    }


    deleteUploadConsetForm(caseDetail: Consent): Observable<Consent> {
        let cases = this._Consent.getValue();
        let index = cases.findIndex((currentCase: Consent) => currentCase.id === caseDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._ConsentFormService.deleteUploadConsentform(caseDetail).subscribe((caseDetail: Consent) => {
                this._Consent.next(cases.delete(index));
                resolve(caseDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent>>Observable.from(promise);
    }

    // DownloadConsentForm(CaseId: Number): Observable<Consent[]> {
    //     let promise = new Promise((resolve, reject) => {
    //         this._ConsentFormService.DownloadConsentForm(CaseId).subscribe((consent: Consent[]) => {
    //             this._Consent.next(List(consent));
    //             resolve(consent);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<Consent[]>>Observable.fromPromise(promise);
    // }

    getCompany(CaseId: Number): Observable<Consent[]> {
        let promise = new Promise((resolve, reject) => {
            this._ConsentFormService.getcompany(CaseId).subscribe((doctors: Consent[]) => {
                this._Consent.next(List(doctors));
                resolve(doctors);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }


    downloadConsentForm(CaseId: Number, documentId: Number): Observable<Consent[]> {
        let promise = new Promise((resolve, reject) => {
            this._ConsentFormService.downloadConsentForm(CaseId, documentId).subscribe((consent: Consent[]) => {
                this._Consent.next(List(consent));
                resolve(consent);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }


    downloadTemplate(CaseId: Number, CompanyId: Number): Observable<Consent[]> {
        let promise = new Promise((resolve, reject) => {
            this._ConsentFormService.downloadTemplate(CaseId, CompanyId).subscribe((consent: Consent[]) => {
                this._Consent.next(List(consent));
                resolve(consent);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }
}

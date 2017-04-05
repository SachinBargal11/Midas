import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Case } from '../models/case';
import { CaseService } from '../services/cases-services';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import { CaseDocument } from '../models/case-document';

@Injectable()
export class CasesStore {

    private _cases: BehaviorSubject<List<Case>> = new BehaviorSubject(List([]));
    private _companyCases: BehaviorSubject<List<Case>> = new BehaviorSubject(List([]));

    constructor(
        private _casesService: CaseService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._cases.next(this._cases.getValue().clear());
    }

    get case() {
        return this._cases.asObservable();
    }

    getCases(patientId: number): Observable<Case[]> {
        let promise = new Promise((resolve, reject) => {
            this._casesService.getCases(patientId).subscribe((cases: Case[]) => {
                this._cases.next(List(cases));
                resolve(cases);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Case[]>>Observable.fromPromise(promise);
    }
    getCasesByCompany(): Observable<Case[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._casesService.getCasesByCompany(companyId).subscribe((cases: Case[]) => {
                this._companyCases.next(List(cases));
                resolve(cases);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Case[]>>Observable.fromPromise(promise);
    }
    getCasesByCompanyAndDoctorId(): Observable<Case[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._casesService.getCasesByCompanyAndDoctorId(companyId).subscribe((cases: Case[]) => {
                this._companyCases.next(List(cases));
                resolve(cases);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Case[]>>Observable.fromPromise(promise);
    }


    getDocumentsForCaseId(caseId: number): Observable<CaseDocument[]> {
        let promise = new Promise((resolve, reject) => {
            this._casesService.getDocumentsForCaseId(caseId).subscribe((documents: CaseDocument[]) => {
                resolve(documents);
            }, error => {
                reject(error);
            });
        });
        return <Observable<CaseDocument[]>>Observable.fromPromise(promise);
    }

    uploadDocument(DocumentsDetail: CaseDocument[], currentCaseId: number): Observable<CaseDocument[]> {
        let promise = new Promise((resolve, reject) => {
            this._casesService.uploadDocumentsForCase(DocumentsDetail, currentCaseId).subscribe((DocumentsDetail: CaseDocument[]) => {
                resolve(DocumentsDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<CaseDocument[]>>Observable.from(promise);
    }

    uploadScannedDocuments(dwObject: any, currentCaseId: number): Observable<CaseDocument[]> {
        let promise = new Promise((resolve, reject) => {
            this._casesService.uploadScannedDocuments(dwObject, currentCaseId).subscribe((DocumentsDetail: CaseDocument[]) => {
                resolve(DocumentsDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<CaseDocument[]>>Observable.from(promise);
    }



    findCaseById(id: number) {
        let cases = this._cases.getValue();
        let index = cases.findIndex((currentCase: Case) => currentCase.id === id);
        return cases.get(index);
    }

    fetchCaseById(id: number): Observable<Case> {
        let promise = new Promise((resolve, reject) => {
            let matchedCase: Case = this.findCaseById(id);
            if (matchedCase) {
                resolve(matchedCase);
            } else {
                this._casesService.getCase(id).subscribe((caseDetail: Case) => {
                    resolve(caseDetail);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Case>>Observable.fromPromise(promise);
    }

    addCase(caseDetail: Case): Observable<Case> {
        let promise = new Promise((resolve, reject) => {
            this._casesService.addCase(caseDetail).subscribe((caseDetail: Case) => {
                this._cases.next(this._cases.getValue().push(caseDetail));
                resolve(caseDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Case>>Observable.from(promise);
    }

    updateCase(caseDetail: Case): Observable<Case> {
        let promise = new Promise((resolve, reject) => {
            this._casesService.updateCase(caseDetail).subscribe((updatedCase: Case) => {
                let caseDetail: List<Case> = this._cases.getValue();
                let index = caseDetail.findIndex((currentCase: Case) => currentCase.id === updatedCase.id);
                caseDetail = caseDetail.update(index, function () {
                    return updatedCase;
                });
                this._cases.next(caseDetail);
                resolve(caseDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Case>>Observable.from(promise);
    }

    deleteCase(caseDetail: Case): Observable<Case> {
        let cases = this._cases.getValue();
        let index = cases.findIndex((currentCase: Case) => currentCase.id === caseDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._casesService.deleteCase(caseDetail).subscribe((caseDetail: Case) => {
                this._cases.next(cases.delete(index));
                resolve(caseDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Case>>Observable.from(promise);
    }
    
    deleteDocument(caseDetail: CaseDocument): Observable<Case> {
        let cases = this._cases.getValue();
        let index = cases.findIndex((currentCase: Case) => currentCase.id === caseDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._casesService.deleteDocument(caseDetail).subscribe((caseDetail: Case) => {
                this._cases.next(cases.delete(index));
                resolve(caseDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Case>>Observable.from(promise);
    }
}

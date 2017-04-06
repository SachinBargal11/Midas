import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { AddConsent } from '../models/add-consent-form';
import { AddDocConsentFormService } from '../services/consent-form-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class AddDocConsentStore {

    private _AddConsent: BehaviorSubject<List<AddConsent>> = new BehaviorSubject(List([]));

    constructor(
        private _AddConsentFormService: AddDocConsentFormService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._AddConsent.next(this._AddConsent.getValue().clear());
    }

    get doctors() {
        return this._AddConsent.asObservable();
    }

    getdoctors(patientId: Number): Observable<AddConsent[]> {

        let promise = new Promise((resolve, reject) => {
            this._AddConsentFormService.getdoctors(patientId).subscribe((doctors: AddConsent[]) => {
                this._AddConsent.next(List(doctors));
                resolve(doctors);
            }, error => {
                reject(error);
            });
        });
        return <Observable<AddConsent[]>>Observable.fromPromise(promise);
    }


    Save(consentDetail: AddConsent): Observable<AddConsent> {
        let promise = new Promise((resolve, reject) => {
            this._AddConsentFormService.Save(consentDetail).subscribe((consentDetail: AddConsent) => {
                this._AddConsent.next(this._AddConsent.getValue().push(consentDetail));
                resolve(consentDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<AddConsent>>Observable.from(promise);
    }

    getDocumentsForCaseId(caseId: number): Observable<AddConsent[]> {
        let promise = new Promise((resolve, reject) => {
            this._AddConsentFormService.getDocumentsForCaseId(caseId).subscribe((documents: AddConsent[]) => {
                resolve(documents);
            }, error => {
                reject(error);
            });
        });
        return <Observable<AddConsent[]>>Observable.fromPromise(promise);
    }


    findById(id: number) {
        let editConsent = this._AddConsent.getValue();
        let index = editConsent.findIndex((currentId: AddConsent) => currentId.id === id);
        return editConsent.get(index);
    }


    editDoctorCaseConsentApproval(id: number): Observable<AddConsent> {
        let promise = new Promise((resolve, reject) => {
            // let matchedDoctorConsent: AddConsent = this.findById(id);
            // if (matchedDoctorConsent) {
            //     resolve(matchedDoctorConsent);
            // } else {
            this._AddConsentFormService.getDoctorCaseConsentApproval(id).subscribe((editConsent: AddConsent[]) => {
                resolve(editConsent);
            }, error => {
                reject(error);
            });
            //}
        });
        return <Observable<AddConsent>>Observable.fromPromise(promise);
    }

}

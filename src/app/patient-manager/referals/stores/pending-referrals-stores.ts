import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { PrefferedMedicalProvider } from '../models/preferred-medical-provider';
import { PendingReferral } from '../models/pending-referral';
import { PendingReferralService } from '../services/pending-referrals-service';
import { PendingReferralList } from '../models/pending-referral-list';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import * as _ from 'underscore';
import { InboundOutboundList } from '../models/inbound-outbound-referral';
@Injectable()
export class PendingReferralStore {

    private _pendingReferrals: BehaviorSubject<List<PrefferedMedicalProvider>> = new BehaviorSubject(List([]));
    private _pendingReferralsList: BehaviorSubject<List<PendingReferralList>> = new BehaviorSubject(List([]));
    private _pendingReferral: BehaviorSubject<List<PendingReferral>> = new BehaviorSubject(List([]));
    private _inboundOutboundList: BehaviorSubject<List<InboundOutboundList>> = new BehaviorSubject(List([]));


    constructor(
        private _pendingReferralService: PendingReferralService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._pendingReferrals.next(this._pendingReferrals.getValue().clear());
        this._pendingReferralsList.next(this._pendingReferralsList.getValue().clear());
    }

    get PendingReferral() {
        return this._pendingReferrals.asObservable();
    }

    get PendingReferralList() {
        return this._pendingReferralsList.asObservable();
    }

    getPreferredCompanyDoctorsAndRoomByCompanyId(companyId: number, specialityId: number, roomTestId: number): Observable<PrefferedMedicalProvider[]> {
        let promise = new Promise((resolve, reject) => {
            this._pendingReferralService.getPreferredCompanyDoctorsAndRoomByCompanyId(companyId, specialityId, roomTestId)
                .subscribe((prefferedMedicalProvider: PrefferedMedicalProvider[]) => {
                    resolve(prefferedMedicalProvider);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<PrefferedMedicalProvider[]>>Observable.fromPromise(promise);
    }

    getPendingReferralByCompanyId(companyId: number): Observable<PendingReferralList[]> {
        let promise = new Promise((resolve, reject) => {
            this._pendingReferralService.getPendingReferralByCompanyId(companyId)
                .subscribe((pendingReferralList: PendingReferralList[]) => {
                    resolve(pendingReferralList);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<PendingReferralList[]>>Observable.fromPromise(promise);
    }


    savePendingReferral(pendingReferralDetail: PendingReferral): Observable<PendingReferral> {
        let promise = new Promise((resolve, reject) => {
            this._pendingReferralService.savePendingReferral(pendingReferralDetail).subscribe((pendingReferralDetail: PendingReferral) => {
                {
                    this._pendingReferral.next(this._pendingReferral.getValue().push(pendingReferralDetail));
                }
                resolve(pendingReferralDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PendingReferral>>Observable.from(promise);
    }

    //Outbound Start
    getReferralsByReferringCompanyId(): Observable<InboundOutboundList[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._pendingReferralService.getReferralsByReferringCompanyId(companyId).subscribe((referrals: InboundOutboundList[]) => {
                this._inboundOutboundList.next(List(referrals));
                resolve(referrals);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InboundOutboundList[]>>Observable.fromPromise(promise);
    }

    getReferralsByReferringUserId(): Observable<InboundOutboundList[]> {
        let userId: number = this._sessionStore.session.user.id;
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._pendingReferralService.getReferralsByReferringUserId(userId, companyId).subscribe((referrals: InboundOutboundList[]) => {
                this._inboundOutboundList.next(List(referrals));
                resolve(referrals);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InboundOutboundList[]>>Observable.fromPromise(promise);
    }
    //Outbound end
    deletePendingReferral(pendingReferralList: PendingReferralList): Observable<PendingReferralList> {
        let pendingReferral = this._pendingReferralsList.getValue();
        let index = pendingReferral.findIndex((currentPendingReferral: PendingReferralList) => currentPendingReferral.id === pendingReferralList.id);
        let promise = new Promise((resolve, reject) => {
            this._pendingReferralService.deletePendingReferral(pendingReferralList).subscribe((pendingReferralList: PendingReferralList) => {
                this._pendingReferralsList.next(pendingReferral.delete(index));
                resolve(pendingReferralList);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PendingReferralList>>Observable.from(promise);
    }
    //inbound Start
    getReferralsByReferredToCompanyId(): Observable<InboundOutboundList[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._pendingReferralService.getReferralsByReferredToCompanyId(companyId).subscribe((referrals: InboundOutboundList[]) => {
                this._inboundOutboundList.next(List(referrals));
                resolve(referrals);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InboundOutboundList[]>>Observable.fromPromise(promise);
    }
    getReferralsByReferredToDoctorId(): Observable<InboundOutboundList[]> {
        let doctorId: number = this._sessionStore.session.user.id;
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._pendingReferralService.getReferralsByReferredToDoctorId(doctorId, companyId).subscribe((referrals: InboundOutboundList[]) => {
                this._inboundOutboundList.next(List(referrals));
                resolve(referrals);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InboundOutboundList[]>>Observable.fromPromise(promise);
    }
    //inbound end

    getReferralsByCaseAndCompanyId(caseId: number, companyId: number): Observable<InboundOutboundList[]> {
        let promise = new Promise((resolve, reject) => {
            this._pendingReferralService.getReferralsByCaseId(caseId, companyId).subscribe((referrals: InboundOutboundList[]) => {
                this._inboundOutboundList.next(List(referrals));
                resolve(referrals);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InboundOutboundList[]>>Observable.fromPromise(promise);
    }

     //inhouse Start
     getInhouseReferralsByCompanyId(): Observable<InboundOutboundList[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._pendingReferralService.getInhouseReferralsByCompanyId(companyId).subscribe((referrals: InboundOutboundList[]) => {
                this._inboundOutboundList.next(List(referrals));
                resolve(referrals);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InboundOutboundList[]>>Observable.fromPromise(promise);
    }

    getInhouseReferralsByDoctorId(): Observable<InboundOutboundList[]> {
        let doctorId: number = this._sessionStore.session.user.id;
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._pendingReferralService.getInhouseReferralsByDoctorId(doctorId, companyId).subscribe((referrals: InboundOutboundList[]) => {
                this._inboundOutboundList.next(List(referrals));
                resolve(referrals);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InboundOutboundList[]>>Observable.fromPromise(promise);
    }

    //inhouse end

}


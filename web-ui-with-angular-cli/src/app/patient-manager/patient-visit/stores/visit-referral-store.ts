import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { VisitReferral } from '../models/visit-referral';
import { VisitReferralService } from '../services/visit-referral-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import * as _ from 'underscore';

@Injectable()
export class VisitReferralStore {

    private _visitReferral: BehaviorSubject<List<VisitReferral>> = new BehaviorSubject(List([]));

    constructor(
        private _visitReferralService: VisitReferralService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._visitReferral.next(this._visitReferral.getValue().clear());
    }

    get VisitReferrals() {
        return this._visitReferral.asObservable();
    }

    // findPendingReferralById(id: number): VisitReferral {
    //     let pendingReferrals = this._visitReferral.getValue();
    //     let index = pendingReferrals.findIndex((currentPendingReferral: VisitReferral) => currentPendingReferral.id === id);
    //     return pendingReferrals.get(index);
    // }

    // fetchPendingReferralById(id: number): Observable<PendingReferral> {
    //     let promise = new Promise((resolve, reject) => {
    //         let matchedPendingReferral: PendingReferral = this.findPendingReferralById(id);
    //         if (matchedPendingReferral) {
    //             resolve(matchedPendingReferral);
    //         } else {
    //             this._visitReferralervice.getPatientVisit(id).subscribe((PendingReferralDetail: VisitReferral) => {
    //                 resolve(PendingReferralDetail);
    //             }, error => {
    //                 reject(error);
    //             });
    //         }
    //     });
    //     return <Observable<PendingReferral>>Observable.fromPromise(promise);
    // }

    saveVisitReferral(visitReferralDetail: VisitReferral[]): Observable<VisitReferral[]> {
        let promise = new Promise((resolve, reject) => {
            this._visitReferralService.saveVisitReferral(visitReferralDetail).subscribe((visitReferralDetails: VisitReferral[]) => {
                _.forEach(visitReferralDetails, (currentVisitReferral: VisitReferral) => {
                this._visitReferral.next(this._visitReferral.getValue().push(currentVisitReferral));
                })
                resolve(visitReferralDetails);
            }, error => {
                reject(error);
            });
        });
        return <Observable<VisitReferral[]>>Observable.from(promise);
    }

    // updatePatientVisit(pendingReferralDetail: PendingReferral): Observable<PendingReferral> {
    //     let promise = new Promise((resolve, reject) => {
    //         this._visitReferralervice.updatePendingReferral(pendingReferralDetail).subscribe((updatedPendingReferral: PendingReferral) => {
    //             let pendingReferralDetail: List<PendingReferral> = this._visitReferral.getValue();
    //             let index = pendingReferralDetail.findIndex((currentPendingReferral: PendingReferral) => currentPendingReferral.id === updatedPendingReferral.id);
    //             pendingReferralDetail = pendingReferralDetail.update(index, function () {
    //                 return updatedPendingReferral;
    //             });
    //             this._visitReferral.next(pendingReferralDetail);
    //             resolve(updatedPendingReferral);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<PendingReferral>>Observable.from(promise);
    // }

    // deletePendingReferral(pendingReferralDetail: PendingReferral): Observable<PendingReferral> {
    //     let pendingReferrals = this._visitReferral.getValue();
    //     let index = pendingReferrals.findIndex((currentPendingReferral: PendingReferral) => currentPendingReferral.id === pendingReferralDetail.id);
    //     let promise = new Promise((resolve, reject) => {
    //         this._visitReferralervice.deletePatientVisit(pendingReferralDetail).subscribe((pendingReferralDetail: PendingReferral) => {
    //             this._visitReferral.next(pendingReferrals.delete(index));
    //             resolve(pendingReferralDetail);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<PendingReferral>>Observable.from(promise);
    // }
}


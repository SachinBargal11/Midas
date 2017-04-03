import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Referral } from '../models/referral';
import { ReferralService } from '../services/referral-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class ReferralStore {

    private _referrals: BehaviorSubject<List<Referral>> = new BehaviorSubject(List([]));

    constructor(
        private _referralService: ReferralService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get referrals() {
        return this._referrals.asObservable();
    }

    getReferralsByCaseId(caseId: number): Observable<Referral[]> {
        let promise = new Promise((resolve, reject) => {
            this._referralService.getReferralsByCaseId(caseId).subscribe((referrals: Referral[]) => {
                this._referrals.next(List(referrals));
                resolve(referrals);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Referral[]>>Observable.fromPromise(promise);
    }

    addReferral(referral: Referral): Observable<Referral> {
        let promise = new Promise((resolve, reject) => {
            this._referralService.addReferral(referral).subscribe((referral: Referral) => {
                this._referrals.next(this._referrals.getValue().push(referral));
                resolve(referral);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Referral>>Observable.from(promise);
    }
    deleteReferral(referral: Referral) {
        let referrals = this._referrals.getValue();
        let index = referrals.findIndex((currentReferral: Referral) => currentReferral.id === referral.id);
        let promise = new Promise((resolve, reject) => {
            this._referralService.deleteReferral(referral)
                .subscribe((referral: Referral) => {
                    this._referrals.next(referrals.delete(index));
                    resolve(referral);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<Referral>>Observable.from(promise);
    }

    resetStore() {
        this._referrals.next(this._referrals.getValue().clear());
    }
}

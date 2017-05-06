import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { PrefferedMedicalProvider } from '../models/preferred-medical-provider';
import { PendingReferralService } from '../services/pending-referrals-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import * as _ from 'underscore';

@Injectable()
export class PendingReferralStore {

    private _pendingReferrals: BehaviorSubject<List<PrefferedMedicalProvider>> = new BehaviorSubject(List([]));

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
    }

    get PendingReferral() {
        return this._pendingReferrals.asObservable();
    }
    getPreferredCompanyDoctorsAndRoomByCompanyId(companyId: number): Observable<PrefferedMedicalProvider[]> {
        let promise = new Promise((resolve, reject) => {
            this._pendingReferralService.getPreferredCompanyDoctorsAndRoomByCompanyId(companyId)
                .subscribe((prefferedMedicalProvider: PrefferedMedicalProvider[]) => {
                    resolve(prefferedMedicalProvider);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<PrefferedMedicalProvider[]>>Observable.fromPromise(promise);
    }

}


import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { AddConsent } from '../models/add-consent-form';
import { AddConsentFormService } from '../services/consent-form-service';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';
import {SessionStore} from '../../../commons/stores/session-store';


@Injectable()
export class AddConsentStore {

    private _AddConsent: BehaviorSubject<List<AddConsent>> = new BehaviorSubject(List([]));

    constructor(
        private _AddConsentFormService:  AddConsentFormService,
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
   
  
}

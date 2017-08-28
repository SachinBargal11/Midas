import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { AutoInformation } from '../models/autoInformation';
import { AutoInformationService } from '../services/autoInformation-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import { School } from '../models/school';
@Injectable()
export class AutoInformationStore {

    private _autoInformation: BehaviorSubject<List<AutoInformation>> = new BehaviorSubject(List([]));
    private _schools: BehaviorSubject<List<School>> = new BehaviorSubject(List([]));
    constructor(
        private _autoInformationService: AutoInformationService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    getByCaseId(caseId: Number): Observable<AutoInformation> {
        let promise = new Promise((resolve, reject) => {
            this._autoInformationService.getByCaseId(caseId).subscribe((autoInformation: AutoInformation) => {
                resolve(autoInformation);
            }, error => {
                reject(error);
            });
        });
        return <Observable<AutoInformation>>Observable.fromPromise(promise);
    }

    saveAutoInformation(autoInformation: AutoInformation): Observable<AutoInformation> {
        let promise = new Promise((resolve, reject) => {
            this._autoInformationService.saveAutoInformation(autoInformation).subscribe((autoInformation: AutoInformation) => {
                this._autoInformation.next(this._autoInformation.getValue().push(autoInformation));
                resolve(autoInformation);
            }, error => {
                reject(error);
            });
        });
        return <Observable<AutoInformation>>Observable.from(promise);
    }
    resetStore() {
        this._autoInformation.next(this._autoInformation.getValue().clear());
    }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { AutoInformation } from '../models/autoInformation';
import { AutoInformationService } from '../services/autoInformation-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import { DefendantAutoInformation } from '../models/defendantAutoInformation';
@Injectable()
export class AutoInformationStore {

    private _autoInformation: BehaviorSubject<List<AutoInformation>> = new BehaviorSubject(List([]));
    private _defendantAutoInformation: BehaviorSubject<List<DefendantAutoInformation>> = new BehaviorSubject(List([]));
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


    getDefendantByCaseId(caseId: Number): Observable<DefendantAutoInformation> {
        let promise = new Promise((resolve, reject) => {
            this._autoInformationService.getDefendantByCaseId(caseId).subscribe((defendantAutoInformation: DefendantAutoInformation) => {
                resolve(defendantAutoInformation);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DefendantAutoInformation>>Observable.fromPromise(promise);
    }

    saveDefendantAutoInformation(defendantAutoInformation: DefendantAutoInformation): Observable<DefendantAutoInformation> {
        let promise = new Promise((resolve, reject) => {
            this._autoInformationService.saveDefendantAutoInformation(defendantAutoInformation).subscribe((autoInformation: DefendantAutoInformation) => {
                this._defendantAutoInformation.next(this._defendantAutoInformation.getValue().push(defendantAutoInformation));
                resolve(autoInformation);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DefendantAutoInformation>>Observable.from(promise);
    }

    resetStore() {
        this._autoInformation.next(this._autoInformation.getValue().clear());
    }
}
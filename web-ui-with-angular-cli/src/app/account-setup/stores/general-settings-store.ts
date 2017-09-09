import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { GeneralSetting } from '../models/general-settings';
import { GeneralSettingService } from '../services/general-settings-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../commons/stores/session-store';
import { Account } from '../../account/models/account';

@Injectable()
export class GeneralSettingStore {

    private _generalSetting: BehaviorSubject<List<GeneralSetting>> = new BehaviorSubject(List([]));

    constructor(
        private _generalSettingService: GeneralSettingService,

        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }
    resetStore() {
        this._generalSetting.next(this._generalSetting.getValue().clear());
    }

    save(generalSetting: GeneralSetting): Observable<GeneralSetting> {
        let promise = new Promise((resolve, reject) => {
            this._generalSettingService.save(generalSetting).subscribe((GeneralSetting) => {
                this._generalSetting.next(this._generalSetting.getValue().push(GeneralSetting));
                resolve(GeneralSetting);
            }, error => {
                reject(error);
            });
        });
        return <Observable<GeneralSetting>>Observable.from(promise);
    }

    getGeneralSettingByCompanyId(companyId:number): Observable<GeneralSetting> {
        let promise = new Promise((resolve, reject) => {
            this._generalSettingService.getGeneralSettingByCompanyId(companyId).subscribe((GeneralSetting) => {
                resolve(GeneralSetting);
            }, error => {
                reject(error);
            });
        });
        return <Observable<GeneralSetting>>Observable.fromPromise(promise);
    }

}
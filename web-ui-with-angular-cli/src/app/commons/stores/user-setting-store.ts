import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { SessionStore } from './session-store';
import { UserSetting } from '../models/user-setting';
import { UserSettingService } from '../services/user-setting-service';


@Injectable()
export class UserSettingStore {
    private _userSetting: BehaviorSubject<List<UserSetting>> = new BehaviorSubject(List([]));

    constructor(
        private _userSettingService: UserSettingService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._userSetting.next(this._userSetting.getValue().clear());
    }

    saveUserSetting() {

    }
}


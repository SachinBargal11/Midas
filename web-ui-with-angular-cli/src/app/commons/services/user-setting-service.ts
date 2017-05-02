import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as _ from 'underscore';
import { environment } from '../../../environments/environment';
import { SessionStore } from '../../commons/stores/session-store';
import { UserSetting } from '../models/user-setting';
import { UserSettingAdapter } from './adapters/user-setting-adapter';


@Injectable()
export class UserSettingService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getUserSettingById(id: Number): Observable<UserSetting> {
        let promise: Promise<UserSetting> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/UserPersonalSetting/get/' + id).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    let user = null;
                    if (data) {
                        user = UserSettingAdapter.parseResponse(data);
                        resolve(user);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<UserSetting>>Observable.fromPromise(promise);
    }


    getUserSettingByUserId(userId: Number,companyId:Number): Observable<UserSetting> {
        let promise: Promise<UserSetting> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/UserPersonalSetting/GetByUserAndCompanyId/' + userId + '/' + companyId).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    let user = null;
                    if (data) {
                        user = UserSettingAdapter.parseResponse(data);
                        resolve(user);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<UserSetting>>Observable.fromPromise(promise);
    }


    saveUserSettings(userSetting: UserSetting): Observable<UserSetting> {
        let promise: Promise<UserSetting> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/UserPersonalSetting/save', JSON.stringify(userSetting), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((userSettingData: any) => {
                    let parsedUserSetting: UserSetting = null;
                    parsedUserSetting = UserSettingAdapter.parseResponse(parsedUserSetting);
                    resolve(parsedUserSetting);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<UserSetting>>Observable.fromPromise(promise);

    }
}
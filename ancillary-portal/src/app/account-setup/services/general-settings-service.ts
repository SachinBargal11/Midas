import { SessionStore } from '../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { GeneralSetting } from '../models/general-settings';
import { GeneralSettingAdapter } from './adapters/general-setting-adapter';

import { CompanyAdapter } from '../../account/services/adapters/company-adapter';

@Injectable()
export class GeneralSettingService {
    companies: any[];
    private _url: string = `${environment.SERVICE_BASE_URL}`;

    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }


    save(requestData: GeneralSetting): Observable<GeneralSetting> {
        let promise: Promise<GeneralSetting> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(environment.SERVICE_BASE_URL + '/GeneralSetting/Save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<GeneralSetting>>Observable.fromPromise(promise);
    }
}
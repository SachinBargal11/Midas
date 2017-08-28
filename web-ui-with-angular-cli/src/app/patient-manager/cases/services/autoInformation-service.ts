import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { AutoInformation } from '../models/autoInformation';
import { AutoInformationAdapter } from './adapters/autoInformation-adapter';
@Injectable()
export class AutoInformationService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getByCaseId(caseId: Number): Observable<AutoInformation> {
        let promise: Promise<AutoInformation> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PlaintiffVehicle/getByCaseId/' + caseId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data) => {
                    let autoInformation = null;
                    autoInformation = AutoInformationAdapter.parseResponse(data);
                    resolve(autoInformation);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<AutoInformation>>Observable.fromPromise(promise);
    }
    saveAutoInformation(autoInformation: AutoInformation): Observable<AutoInformation> {
        let promise: Promise<AutoInformation> = new Promise((resolve, reject) => {
            let requestData: any = autoInformation.toJS();
            return this._http.post(this._url + '/PlaintiffVehicle/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedAutoInformation: AutoInformation = null;
                    parsedAutoInformation = AutoInformationAdapter.parseResponse(data);
                    resolve(parsedAutoInformation);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<AutoInformation>>Observable.fromPromise(promise);
    }
}
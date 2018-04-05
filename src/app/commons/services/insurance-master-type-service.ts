import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { InsuranceMasterType } from '../models/insurance-master-type';
import { SessionStore } from '../../commons/stores/session-store';

@Injectable()
export class InsuranceMasterTypeService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getInsuranceMasterType(): Observable<InsuranceMasterType[]> {
        let promise: Promise<InsuranceMasterType[]> = new Promise((resolve, reject) => {
        return this._http.get(environment.SERVICE_BASE_URL + '/InsuranceMasterType/getAll', {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<InsuranceMasterType[]>>Observable.fromPromise(promise);
    }
    
}
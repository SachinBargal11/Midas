import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import * as _ from 'underscore';
import { Account } from '../models/account';

@Injectable()
export class RegistrationService {
    companies: any[];
    // private _url: string = `${environment.SERVICE_BASE_URL}`;

    constructor(private _http: Http) { }
    registerCompany(account: Account): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            let requestData: any = account.toJS();
            requestData.contactInfo = requestData.user.contact;
            requestData.company = requestData.companies;
            // requestData.company.subsCriptionType = requestData.subscriptionPlan;
            requestData.company.subscriptionType = requestData.subscriptionPlan;
            requestData.company.status = requestData.accountStatus;
            requestData.company.companyStatusTypeId = 1;
            requestData.user = _.omit(requestData.user, 'contact');
            requestData = _.omit(requestData, 'companies', 'subscriptionPlan', 'accountStatus', 'accessToken', 'tokenExpiresAt', 'tokenResponse', 'type', 'originalResponse');
            // requestData = _.omit(requestData, 'accountStatus');
            console.log(requestData);
            return this._http.post(environment.SERVICE_BASE_URL + '/Company/Signup', JSON.stringify(requestData), {
                headers: headers
            }).map(res => res.json()).subscribe((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
}
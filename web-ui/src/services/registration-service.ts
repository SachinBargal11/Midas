import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import _ from 'underscore';
import { Account } from '../models/account';

@Injectable()
export class RegistrationService {
    companies: any[];
    private _url: string = `${Environment.SERVICE_BASE_URL}`;

    constructor(private _http: Http) { }
    registerCompany(account: Account): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            let requestData: any = account.toJS();
            requestData.contactInfo = requestData.user.contact;
            requestData.company.subsCriptionType = requestData.subscriptionPlan;
            requestData.company.status = requestData.accountStatus;
            requestData.user = _.omit(requestData.user, 'contact');
            requestData = _.omit(requestData, 'subscriptionPlan');
            requestData = _.omit(requestData, 'accountStatus');
            console.log(requestData);
            return this._http.post(this._url + '/Company/Signup', JSON.stringify(requestData), {
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
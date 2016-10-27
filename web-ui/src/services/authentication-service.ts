import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {AccountDetail} from '../models/account-details';
import {User} from '../models/user';
import {UserAdapter} from './adapters/user-adapter';
import {CompanyAdapter} from './adapters/company-adapter';
import _ from 'underscore';
import {Company} from '../models/company';

import {AccountStatus} from '../models/enums/AccountStatus';
import {UserType} from '../models/enums/UserType';

@Injectable()
export class AuthenticationService {
companies: any[];
     private _url: string = `${Environment.SERVICE_BASE_URL}`;
     private _url1: string = 'http://localhost:3004/company';

    constructor(private _http: Http) { }
    registerCompany(companyDetail: Company): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this._url + '/Company/Signup', JSON.stringify(companyDetail), {
                headers: headers
            }).map(res => res.json()).subscribe((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    getCompanies(): Observable<Company[]> {
        let promise = new Promise((resolve, reject) => {
        return this._http.get(this._url1).map(res => res.json())
         .subscribe((data: any) => {
                    this.companies = (<Object[]>data).map((companyData: any) => {
                        return CompanyAdapter.parseResponse(companyData);
                    });
                    resolve(this.companies);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Company[]>>Observable.fromPromise(promise);
    }
    register(accountDetail: AccountDetail): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let accountDetailRequestData;
            try {
                accountDetailRequestData = accountDetail.toJS();

                // add/replace values which need to be changed
                _.extend(accountDetailRequestData.user, {
                    userType: UserType[accountDetailRequestData.user.userType],
                    dateOfBirth: accountDetailRequestData.user.dateOfBirth ? accountDetailRequestData.user.dateOfBirth.toISOString() : null
                });

                _.extend(accountDetailRequestData.account, {
                    status: AccountStatus[accountDetailRequestData.account.status]
                });

                // remove unneeded keys 
                accountDetailRequestData.user = _.omit(accountDetailRequestData.user, 'accountID', 'gender', 'status', 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                accountDetailRequestData.address = _.omit(accountDetailRequestData.address, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                accountDetailRequestData.contactInfo = _.omit(accountDetailRequestData.contactInfo, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                accountDetailRequestData.account = _.omit(accountDetailRequestData.account, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');

            } catch (error) {
                reject(error);
            }

            return this._http.post(this._url + '/Account/Signup', JSON.stringify(accountDetailRequestData), {
                headers: headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    if (data.errorMessage) {
                        reject(new Error(data.errorMessage));
                    } else {
                        resolve(data);
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    checkForValidToken(token) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let promise: Promise<User> = new Promise((resolve, reject) => {
            let autheticateRequestData = {
                user: {
                    'token': token
                }
            };
            return this._http.post(this._url + '/validateToken', JSON.stringify(autheticateRequestData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        let user = UserAdapter.parseUserResponse(data);
                        resolve(user);
                    }
                    else {
                        reject(new Error('INVALID_CREDENTIALS'));
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    authenticate(email: string, password: string): Observable<User> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let promise: Promise<User> = new Promise((resolve, reject) => {
            let autheticateRequestData = {
                user: {
                    'userName': email,
                    'password': password
                }
            };
            return this._http.post(this._url + '/User/Signin', JSON.stringify(autheticateRequestData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        let user = UserAdapter.parseUserResponse(data);
                        resolve(user);
                    }
                    else {
                        reject(new Error('INVALID_CREDENTIALS'));
                    }
                }, (error) => {
                    reject(error);
                });
        });

        return <Observable<User>>Observable.fromPromise(promise);
    }

    authenticatePassword(userName: string, oldpassword: string): Observable<User> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let promise: Promise<User> = new Promise((resolve, reject) => {
            let autheticateRequestData = {
                user: {
                    'userName': userName,
                    'password': oldpassword
                }
            };
            return this._http.post(this._url + '/User/Signin', JSON.stringify(autheticateRequestData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        let user = UserAdapter.parseUserResponse(data);
                        resolve(user);
                    }
                    else {
                        reject(new Error('INVALID_CREDENTIALS'));
                    }
                }, (error) => {
                    reject(error);
                });
        });

        return <Observable<User>>Observable.fromPromise(promise);
    }
}
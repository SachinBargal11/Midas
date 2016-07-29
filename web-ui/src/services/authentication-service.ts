import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {AccountDetail} from '../models/account-details';
import {User} from '../models/user';
import {UserAdapter} from './adapters/user-adapter';
import _ from 'underscore';

import {AccountStatus} from '../models/enums/AccountStatus';
import {UserType} from '../models/enums/UserType';

@Injectable()
export class AuthenticationService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;

    constructor(private _http: Http) { }

    register(accountDetail: AccountDetail): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            var headers = new Headers();
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
                if(data.errorMessage) {
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

    authenticate(userId: string, password: string): Observable<User> {
        let promise: Promise<User> = new Promise((resolve, reject) => {
            return this._http.get('http://localhost:3004/users' + '?email=' + userId + '&password=' + password)
                .map(res => res.json())
                .subscribe((data: any) => {
                    if (data.length) {
                        var user = UserAdapter.parseResponse(data[0]);
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

    authenticatePassword(userId: string, oldpassword: string): Observable<User> {
        let promise: Promise<User> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '?id=' + userId + '&password=' + oldpassword)
                .map(res => res.json())
                .subscribe((data: any) => {
                    if (data.length) {
                        var user = UserAdapter.parseResponse(data[0]);
                        resolve(user);
                    }
                    else {
                        console.info('Old password is wrong');
                        reject(new Error('INVALID_CREDENTIALS'))
                    }
                }, (error) => {
                    reject(error);
                });
        });

        return <Observable<User>>Observable.fromPromise(promise);
    }
    updatePassword(userId: string, newpassword: string): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.patch(`${this._url}/${userId}`, JSON.stringify(newpassword), {
                headers: headers
            }).map(res => res.json()).subscribe((data: any) => {
                if (data.length) {
                    var user = UserAdapter.parseResponse(data[0]);
                    resolve(data);
                }
                else {
                    resolve(data);
                }
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

}
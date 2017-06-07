import { Params } from '@angular/router/router';
import { AccountAdapter } from './adapters/account-adapter';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { User } from '../../commons/models/user';
import { UserAdapter } from '../../medical-provider/users/services/adapters/user-adapter';
import * as _ from 'underscore';
import { Account } from '../models/account';
import { Signup } from '../../account-setup/models/signup';
import { SignupAdapter } from '../../account-setup/services/adapters/signup-adapter';

@Injectable()
export class AuthenticationService {
    companies: any[];
    private _url: string = `${environment.SERVICE_BASE_URL}`;

    constructor(private _http: Http) { }

    GeneratePasswordResetLink(userDetail: any): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this._url + '/PasswordToken/GeneratePasswordResetLink', JSON.stringify(userDetail), {
                headers: headers
            })
                .map(res => res.json())
                .subscribe((userData: any) => {
                    resolve(userData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    checkForValidResetPasswordToken(autheticateRequestData) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let promise: Promise<User> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/PasswordToken/ValidatePassword', JSON.stringify(autheticateRequestData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        resolve(data);
                    }
                    else {
                        reject(new Error('INVALID_TOKEN'));
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

                appKey: token

            };
            return this._http.post(this._url + '/Company/ValidateInvitation', JSON.stringify(autheticateRequestData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        resolve(data);
                    }
                    else {
                        reject(new Error('INVALID_TOKEN'));
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    updatePassword(userDetail: any): Observable<any> {
        // userDetail.role = {
        //     name: 'Doctor',
        //     roleType: 'Admin',
        //     status: 'active'
        // };
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this._url + '/User/ResetPassword', JSON.stringify(userDetail), {
                headers: headers
            })
                .map(res => res.json())
                .subscribe((userData: any) => {
                    resolve(userData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);

    }

    authToken(email: string, password: string, forceLogin: boolean): Observable<any> {
        let headers = new Headers();
        let params = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/token', "grant_type=password&username=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        resolve(data);
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
    authenticate(email: string, password: string, forceLogin: boolean, authAccessToken: string): Observable<Account> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', authAccessToken);

        let promise: Promise<Account> = new Promise((resolve, reject) => {
            let autheticateRequestData = {
                'userName': email,
                'password': password,
                'forceLogin': forceLogin
            };
            return this._http.post(this._url + '/User/Signin', JSON.stringify(autheticateRequestData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        // data.company = data.usercompanies[0].company;
                        let user = AccountAdapter.parseResponse(data, authAccessToken);
                        window.sessionStorage.setItem('pin', data.pin);
                        resolve(user);
                    }
                    else {
                        reject(new Error('INVALID_CREDENTIALS'));
                    }
                }, (error) => {
                    reject(error);
                });
        });

        return <Observable<Account>>Observable.fromPromise(promise);
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

    generateCode(userId) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let promise: Promise<User> = new Promise((resolve, reject) => {
            let postData = {
                user: {
                    id: userId
                }
            };
            return this._http.post(this._url + '/OTP/GenerateOTP', JSON.stringify(postData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    window.sessionStorage.setItem('pin', data.pin);
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });

        return <Observable<any>>Observable.fromPromise(promise);
    }

    validateSecurityCode(userId, code, pin) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let promise = new Promise((resolve, reject) => {
            let postData = {
                otp: {
                    otp: code,
                    pin: pin
                },
                user: {
                    id: userId
                }
            };

            return this._http.post(this._url + '/OTP/ValidateOTP', JSON.stringify(postData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<boolean>>Observable.fromPromise(promise);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    updateCompany(userDetail: Signup): Observable<Signup> {
        let promise: Promise<Signup> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this._url + '/Company/UpdateCompany', JSON.stringify(userDetail), {
                headers: headers
            })
                .map(res => res.json())
                .subscribe((userData: any) => {
                    resolve(userData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Signup>>Observable.fromPromise(promise);
    }

    fetchByCompanyId(companyId: Number): Observable<Signup> {
        let promise: Promise<Signup> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.get(this._url + '/Company/getUpdatedCompanyById/' + companyId, {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let provider = null;
                    provider = SignupAdapter.parseResponse(data);
                    resolve(provider);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Signup>>Observable.fromPromise(promise);
    }
}
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import { UserAdapter } from './adapters/user-adapter';
import { UserType } from '../models/enums/user-type';
import { User } from '../models/user';
import { SessionStore } from '../stores/session-store';

@Injectable()
export class UsersService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/users';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getUser(userId: Number): Observable<User> {
        let promise: Promise<User> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/user/get/' + userId).map(res => res.json())
                .subscribe((userData: any) => {
                    let parsedUser: User = null;
                    parsedUser = UserAdapter.parseResponse(userData);
                    resolve(parsedUser);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<User>>Observable.fromPromise(promise);
    }
    getUsers(): Observable<User[]> {
        let requestData = {
            userCompanies: [{
                company: {
                    id: this._sessionStore.session.currentCompany.id
                }
            }]
        };
        let promise: Promise<User[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/user/GetAll', requestData, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let users: any[] = [];
                    if (data) {
                        _.forEach(data, function (currentUser: any) {
                            currentUser.userTypeLabel = User.getUserTypeLabel(currentUser.userType);
                        });
                        users = (<Object[]>data).map((data: any) => {
                            return UserAdapter.parseResponse(data);
                        });
                    }
                    resolve(users);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<User[]>>Observable.fromPromise(promise);
    }
    // getUsers(accountId: number): Observable<AccountDetail[]> {
    //     let promise: Promise<AccountDetail[]> = new Promise((resolve, reject) => {
    //         return this._http.get(this._url + '/Account/Get/' + accountId).map(res => res.json())
    //             .subscribe((data: any) => {
    //                 let users = (<Object[]>data.users).map((userData: any) => {
    //                     return UserAdapter.parseResponse(userData);
    //                 });
    //                 resolve(users);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<AccountDetail[]>>Observable.fromPromise(promise);
    // }

    addUser(userDetail: User): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {


            let requestData: any = userDetail.toJS();
            requestData = {
                user: requestData,
                company: {
                    id: this._sessionStore.session.currentCompany.id
                },
                role: {
                    name: 'Doctor',
                    roleType: 'Admin',
                    status: 'active'
                }
            };

            requestData.contactInfo = requestData.user.contact;
            requestData.address = requestData.user.address;
            requestData.user = _.omit(requestData.user, 'contact', 'address');
            // requestData.company = _.omit(requestData.company, 'taxId', 'companyType', 'name');
            // requestData = _.omit(requestData, 'accountStatus', 'subscriptionPlan', 'companies');
            return this._http.post(this._url + '/User/Add', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((userData: any) => {
                    let parsedUser: User = null;
                    parsedUser = UserAdapter.parseResponse(userData);
                    resolve(parsedUser);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);

    }

    updateUser(userDetail: User): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {


            let requestData: any = userDetail.toJS();
            requestData = {
                user: requestData,
                company: {
                    id: this._sessionStore.session.currentCompany.id
                },
                role: {
                    name: 'Doctor',
                    roleType: 'Admin',
                    status: 'active'
                }
            };

            requestData.contactInfo = requestData.user.contact;
            requestData.address = requestData.user.address;
            requestData.user = _.omit(requestData.user, 'contact', 'address');
            // requestData.company = _.omit(requestData.company, 'taxId', 'companyType', 'name');
            // requestData = _.omit(requestData, 'accountStatus', 'subscriptionPlan');
            return this._http.post(this._url + '/User/Add', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((userData: any) => {
                    let parsedUser: User = null;
                    parsedUser = UserAdapter.parseResponse(userData);
                    resolve(parsedUser);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);

    }
    // updateUser(userDetail: Account): Observable<any> {
    //     let promise: Promise<any> = new Promise((resolve, reject) => {


    //         let userDetailRequestData = userDetail.toJS();

    //         // add/replace values which need to be changed
    //         _.extend(userDetailRequestData.user, {
    //             userType: UserType[userDetailRequestData.user.userType],
    //             dateOfBirth: userDetailRequestData.user.dateOfBirth ? userDetailRequestData.user.dateOfBirth.toISOString() : null
    //         });

    //         // remove unneeded keys 
    //         userDetailRequestData.user = _.omit(userDetailRequestData.user, 'accountId', 'gender', 'status', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
    //         userDetailRequestData.address = _.omit(userDetailRequestData.address, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
    //         userDetailRequestData.contactInfo = _.omit(userDetailRequestData.contactInfo, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
    //         userDetailRequestData.account = _.omit(userDetailRequestData.account, 'name', 'status', 'isDeleted', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');

    //         return this._http.post(this._url + '/User/Add', JSON.stringify(userDetailRequestData), {
    //             headers: this._headers
    //         })
    //             .map(res => res.json())
    //             .subscribe((userData: any) => {
    //                 let parsedUser: AccountDetail = null;
    //                 parsedUser = UserAdapter.parseResponse(userData);
    //                 resolve(parsedUser);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<any>>Observable.fromPromise(promise);

    // }

    updatePassword(userDetail: User): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {


            let userDetailRequestData = userDetail.toJS();

            // add/replace values which need to be changed
            _.extend(userDetailRequestData.user, {
                userType: UserType[userDetailRequestData.user.userType],
                dateOfBirth: userDetailRequestData.user.dateOfBirth ? userDetailRequestData.user.dateOfBirth.toISOString() : null
            });

            // remove unneeded keys 
            userDetailRequestData.user = _.omit(userDetailRequestData.user, 'accountId', 'gender', 'status', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            userDetailRequestData.address = _.omit(userDetailRequestData.address, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            userDetailRequestData.contactInfo = _.omit(userDetailRequestData.contactInfo, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            userDetailRequestData.account = _.omit(userDetailRequestData.account, 'name', 'status', 'isDeleted', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');

            return this._http.post(this._url + '/User/Add', JSON.stringify(userDetailRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((userData: any) => {
                    let parsedUser: User = null;
                    parsedUser = UserAdapter.parseResponse(userData);
                    resolve(parsedUser);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);

    }
    deleteUser(userDetail: User): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {


            let requestData: any = userDetail.toJS();
            requestData = {
                user: requestData,
                company: {
                    id: this._sessionStore.session.currentCompany.id
                },
                role: {
                    name: 'Doctor',
                    roleType: 'Admin',
                    status: 'active'
                }
            };

            requestData.user.isDeleted = 1;
            requestData.contactInfo = requestData.user.contact;
            requestData.address = requestData.user.address;
            requestData.user = _.omit(requestData.user, 'contact', 'address');
            // requestData.company = _.omit(requestData.company, 'taxId', 'companyType', 'name');
            // requestData = _.omit(requestData, 'accountStatus', 'subscriptionPlan');
            return this._http.post(this._url + '/User/Add', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((userData: any) => {
                    let parsedUser: User = null;
                    parsedUser = UserAdapter.parseResponse(userData);
                    resolve(parsedUser);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);

    }

}


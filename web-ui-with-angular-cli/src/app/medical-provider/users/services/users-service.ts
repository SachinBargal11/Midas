import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { UserAdapter } from './adapters/user-adapter';
import { UserType } from '../../../commons/models/enums/user-type';
import { User } from '../../../commons/models/user';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class UsersService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/users';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getUser(userId: Number): Observable<User> {
        let promise: Promise<User> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/user/get/' + userId, {
                headers: this._headers
            }).map(res => res.json())
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
            return this._http.post(environment.SERVICE_BASE_URL + '/user/GetAll', requestData, {
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
    //         return this._http.get(environment.SERVICE_BASE_URL + '/Account/Get/' + accountId, {
    //     headers: this._headers
    // }).map(res => res.json())
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
                role: requestData.roles
            };

            requestData.contactInfo = requestData.user.contact;
            requestData.address = requestData.user.address;
            requestData.user = _.omit(requestData.user, 'roles', 'contact', 'address');
            // requestData.company = _.omit(requestData.company, 'taxId', 'companyType', 'name');
            // requestData = _.omit(requestData, 'accountStatus', 'subscriptionPlan', 'companies');
            return this._http.post(environment.SERVICE_BASE_URL + '/User/Add', JSON.stringify(requestData), {
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
                role: requestData.roles
            };

            requestData.contactInfo = requestData.user.contact;
            requestData.address = requestData.user.address;
            requestData.user = _.omit(requestData.user, 'roles', 'contact', 'address');
            // requestData.company = _.omit(requestData.company, 'taxId', 'companyType', 'name');
            // requestData = _.omit(requestData, 'accountStatus', 'subscriptionPlan');
            return this._http.post(environment.SERVICE_BASE_URL + '/User/Add', JSON.stringify(requestData), {
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

    //         return this._http.post(environment.SERVICE_BASE_URL + '/User/Add', JSON.stringify(userDetailRequestData), {
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


            let userDetailRequestData: any = userDetail.toJS();

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

            return this._http.post(environment.SERVICE_BASE_URL + '/User/Add', JSON.stringify(userDetailRequestData), {
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
                role: requestData.roles
            };

            requestData.user.isDeleted = 1;
            requestData.contactInfo = requestData.user.contact;
            requestData.address = requestData.user.address;
            requestData.user = _.omit(requestData.user, 'roles', 'contact', 'address');
            // requestData.company = _.omit(requestData.company, 'taxId', 'companyType', 'name');
            // requestData = _.omit(requestData, 'accountStatus', 'subscriptionPlan');
            return this._http.post(environment.SERVICE_BASE_URL + '/User/Add', JSON.stringify(requestData), {
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

    getIsExistingUser(userName: string): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/User/checkIsExistingUser/' + userName, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((userData: any) => {
                    // let parsedUser: User[] = null;
                    // parsedUser = UserAdapter.parseResponse(userData);
                    // resolve(parsedUser);
                    resolve(userData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    disassociateDoctorWithCompany(doctorId: number, companyId: number): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/doctor/disassociateDoctorWithCompany/' + companyId + '/' +  doctorId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

}


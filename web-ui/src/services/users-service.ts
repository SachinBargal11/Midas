import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {AccountDetail} from '../models/account-details';
import { Account } from '../models/account';
import {UserAdapter} from './adapters/user-adapter';
import {UserType} from '../models/enums/user-type';

@Injectable()
export class UsersService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/users';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getUser(userId: Number): Observable<Account> {
        let promise: Promise<Account> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/user/get/' + userId).map(res => res.json())
                .subscribe((userData: any) => {
                    resolve(userData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Account>>Observable.fromPromise(promise);
    }
    getUsers(): Observable<Account[]> {
        let promise: Promise<Account[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/user/GetAll', JSON.stringify({}), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Account[]>>Observable.fromPromise(promise);
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

    addUser(userDetail: Account): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {


            let requestData: any = userDetail.toJS();

            requestData.contactInfo = requestData.user.contact;
            requestData.address = requestData.user.address;
            requestData.user = _.omit(requestData.user, 'contact', 'address');
            requestData.company = _.omit(requestData.company, 'taxId', 'companyType', 'name');
            requestData = _.omit(requestData, 'accountStatus', 'subscriptionPlan');
            return this._http.post(this._url + '/User/Add', JSON.stringify(requestData), {
                headers: this._headers
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
    
    updateUser(userDetail: Account): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {


            let requestData: any = userDetail.toJS();

            requestData.contactInfo = requestData.user.contact;
            requestData.address = requestData.user.address;
            requestData.user = _.omit(requestData.user, 'contact', 'address');
            requestData.company = _.omit(requestData.company, 'taxId', 'companyType', 'name');
            requestData = _.omit(requestData, 'accountStatus', 'subscriptionPlan');
            return this._http.post(this._url + '/User/Add', JSON.stringify(requestData), {
                headers: this._headers
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

    updatePassword(userDetail: Account): Observable<any> {
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
                    let parsedUser: AccountDetail = null;
                    parsedUser = UserAdapter.parseResponse(userData);
                    resolve(parsedUser);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);

    }
    deleteUser(user: any): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            return this._http.delete(`${this._url}/${user.id}`)
                .map(res => res.json())
                .subscribe((user) => {
                    resolve(user);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.from(promise);
    }

}


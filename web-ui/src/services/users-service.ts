import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {UserDetail} from '../models/user-details';
import {SessionStore} from '../stores/session-store';
import {UserAdapter} from './adapters/user-adapter';
import {UserType} from '../models/enums/UserType';

@Injectable()
export class UsersService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getUsers(): Observable<UserDetail[]> {
        let promise: Promise<UserDetail[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + "/User/GetAll", JSON.stringify({ "user": [{}] }), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let users = (<Object[]>data).map((userData: any) => {
                        return UserAdapter.parseResponse(userData);
                    });
                    resolve(users);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<UserDetail[]>>Observable.fromPromise(promise);
    }

    addUser(userDetail: UserDetail): Observable<UserDetail> {
        let promise: Promise<UserDetail> = new Promise((resolve, reject) => {


            let userDetailRequestData = userDetail.toJS();

            // add/replace values which need to be changed
            _.extend(userDetailRequestData.user, {
                userType: UserType[userDetailRequestData.user.userType],
                dateOfBirth: userDetailRequestData.user.dateOfBirth ? userDetailRequestData.user.dateOfBirth.toISOString() : null
            });

            // remove unneeded keys 
            userDetailRequestData.user = _.omit(userDetailRequestData.user, 'gender', 'status', 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
            userDetailRequestData.address = _.omit(userDetailRequestData.address, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
            userDetailRequestData.contactInfo = _.omit(userDetailRequestData.contactInfo, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');

            return this._http.post(this._url + '/User/Add', JSON.stringify(userDetailRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((userData: any) => {
                    let parsedUser: UserDetail = null;
                    parsedUser = UserAdapter.parseResponse(userData);
                    resolve(parsedUser);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<UserDetail>>Observable.fromPromise(promise);

    }

}


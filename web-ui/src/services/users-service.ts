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

@Injectable()
export class UsersService {

    private _url: string = `${Environment.SERVICE_BASE_URL}/users`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }
    
    addUser(user: UserDetail): Observable<UserDetail> {
        let promise: Promise<UserDetail> = new Promise((resolve, reject) => {


            let userRequestData = user.toJS();

            // add/replace values which need to be changed
            _.extend(userRequestData, {
                dateOfBirth: userRequestData.dateOfBirth ? userRequestData.dateOfBirth.toISOString() : null
            });

            // remove unneeded keys 
            userRequestData = _.omit(userRequestData, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
            return this._http.post(this._url, JSON.stringify(userRequestData), {
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


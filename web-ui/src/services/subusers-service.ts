import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {SubUser} from '../models/sub-user';
import {SessionStore} from '../stores/session-store';
import {SubUserAdapter} from './adapters/subuser-adapter';

@Injectable()
export class SubUsersService {

    private _url: string = `${Environment.SERVICE_BASE_URL}/subusers`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }
    
    addSubUser(subuser: SubUser): Observable<SubUser> {
        let promise: Promise<SubUser> = new Promise((resolve, reject) => {
            return this._http.post(this._url, JSON.stringify(subuser), {
                headers: this._headers
            })
            .map(res => res.json())
            .subscribe((subuserData: any) => {
                let parsedSubUser: SubUser = null;
                parsedSubUser = SubUserAdapter.parseResponse(subuserData);
                resolve(parsedSubUser);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<SubUser>>Observable.fromPromise(promise);

    }

}


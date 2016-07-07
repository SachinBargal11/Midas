import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {User} from '../models/user';
import {UserAdapter} from './adapters/user-adapter';

@Injectable()
export class AuthenticationService {

    private _url: string = `${Environment.SERVICE_BASE_URL}/users`;

    constructor(private _http: Http) { }

    register(user: User): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this._url, JSON.stringify(user), {
                headers: headers
            }).map(res => res.json()).subscribe((data: any) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    authenticate(userId: string, password: string): Observable<User> {
        let promise: Promise<User> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '?email=' + userId + '&password=' + password)
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

}
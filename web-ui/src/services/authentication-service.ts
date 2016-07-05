import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

    // private _url = "http://gyb-db.herokuapp.com/users";
    private _url = "http://localhost:3004/users";

    constructor(private _http: Http) { }

    register(user) {
        let promise = new Promise((resolve, reject) => {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this._url, JSON.stringify(user), {
                headers: headers
            }).map(res => res.json()).subscribe((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
        return Observable.from(promise);
    }

    authenticate(userId, password) {

        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '?email=' + userId + '&password=' + password)
                .map(res => res.json())
                .subscribe((data) => {

                    if (data.length) {
                        var user = new User({
                            id: data[0].id,
                            name: data[0].name,
                            phone: data[0].phone,
                            email: data[0].email
                        });

                        resolve(user);
                    }
                    else {
                        console.info('Throwing INVALID_CREDENTIALS');
                        reject(new Error('INVALID_CREDENTIALS'));
                    }
                }, (error) => {
                    reject(error);
                });
        });

        return Observable.from(promise);
    }

}
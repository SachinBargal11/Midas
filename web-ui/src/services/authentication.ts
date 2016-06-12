import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

    // private _url = "http://gyb-db.herokuapp.com/users";
    private _url = "http://localhost:3004/users";
    session_user_name;

    constructor(private _http: Http) {}

    register(user) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this._url, JSON.stringify(user), {
            headers: headers
        }).map(res => res.json());
    }

    authenticate(user) {
        return this._http.get(this._url + '?email=' + user.email + '&password=' + user.password)
            .map(res => res.json());
    }

}
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {States} from '../models/states';

@Injectable()
export class StateService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) { }

 getStates(): Observable<States[]> {
            return this._http.get(this._url + "/Utils/GetStates").map(res => res.json());
    }
}

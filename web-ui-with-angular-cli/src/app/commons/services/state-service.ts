import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../../scripts/environment';
import {States} from '../models/states';

@Injectable()
export class StateService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;

    constructor(
        private _http: Http
    ) {

    }

    getStates(): Observable<States[]> {
        return this._http.get(this._url + '/Utils/GetStates').map(res => res.json());
    }
}

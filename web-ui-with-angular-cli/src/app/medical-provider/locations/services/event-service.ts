import { Schedule } from '../models/schedule';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {
    private _url: string = 'http://localhost:3004/data';

    constructor(private http: Http) { }

    getEvents() {
        return this.http.get(this._url)
            .toPromise()
            .then(res => <any[]>res.json().data)
            .then(data => { return data; });
    }
}
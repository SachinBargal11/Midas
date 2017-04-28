import { SessionStore } from '../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { MedicalProviderMaster } from '../models/medical-provider-master';
import { MedicalProviderMasterAdapter } from './adapters/medical-provider-master-adapter';


@Injectable()
export class MedicalProviderMasterService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;

    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }
}
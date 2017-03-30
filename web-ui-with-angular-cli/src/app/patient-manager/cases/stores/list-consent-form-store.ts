

//import { Accident } from '../models/accident';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { ListConsent } from '../models/list-consent-form';

import { ListConsentFormService } from '../services/list-consent-form-service';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';


@Injectable()
export class ListConsentStore {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();
  private _ListConsent: BehaviorSubject<List<ListConsent>> = new BehaviorSubject(List([]));
  
    constructor(private _http: Http,
        private _sessionStore: SessionStore,
        private _listconsentFormService:  ListConsentFormService
    ) {
        this._headers.append('Content-Type', 'application/json');
    }


     getConsetForm(CaseId: Number): Observable<ListConsent[]> {
    
        let promise = new Promise((resolve, reject) => {
            this._listconsentFormService.getConsetForm(CaseId).subscribe((consent: ListConsent[]) => {
                this._ListConsent.next(List(consent));
                resolve(consent);
            }, error => {
                reject(error);
            });
        });
        return <Observable<ListConsent[]>>Observable.fromPromise(promise);
    }  

  deleteConsetForm(caseDetail: ListConsent): Observable<ListConsent> {
        let cases = this._ListConsent.getValue();
        let index = cases.findIndex((currentCase: ListConsent) => currentCase.id === caseDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._listconsentFormService.deleteConsentform(caseDetail).subscribe((caseDetail: ListConsent) => {
                this._ListConsent.next(cases.delete(index));
                resolve(caseDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<ListConsent>>Observable.from(promise);
    }

}
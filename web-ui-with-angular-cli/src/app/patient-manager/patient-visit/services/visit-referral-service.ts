import { ScheduledEventAdapter } from '../../../medical-provider/locations/services/adapters/scheduled-event-adapter';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { VisitReferral } from '../models/visit-referral';
import { SessionStore } from '../../../commons/stores/session-store';
import { visitReferralAdapter } from './adapters/visit-referral-adapter';
import * as moment from 'moment';
import * as _ from 'underscore';


@Injectable()
export class VisitReferralService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    saveVisitReferral(visitReferralDetail: VisitReferral): Observable<VisitReferral> {
        let promise: Promise<VisitReferral> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/PatientVisit/Save', JSON.stringify(visitReferralDetail), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let visitReferral: VisitReferral = null;
                    visitReferral = visitReferralAdapter.parseResponse(data);
                    resolve(visitReferral);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<VisitReferral>>Observable.fromPromise(promise);
    }
}


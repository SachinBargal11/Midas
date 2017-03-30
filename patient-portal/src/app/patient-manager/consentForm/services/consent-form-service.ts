

//import { Accident } from '../models/accident';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { AddConsent } from '../models/add-consent-form';
import { AddConsentAdapter } from './adapters/add-consent-form-adapter';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';


@Injectable()
export class AddConsentFormService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

 getdoctors(PatientId: Number): Observable<AddConsentAdapter> {
        let promise: Promise<AddConsentAdapter> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Doctor/get/' + PatientId).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    if (data.length) {
                        resolve(data);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<AddConsentAdapter>>Observable.fromPromise(promise);
    }

    // constructor () {
    //   this.progress$ = Observable.create(observer => {
    //    this.progressObserver = observer
    //  }).share();
    // }

    public makeFileRequest(url: string, params: string[], files: File[]): Observable<AddConsent> {
        debugger;
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            //xhr.upload.onprogress = (event) => {
            //  this.progress = Math.round(event.loaded / event.total * 100);

            // this.progressObserver.next(this.progress);
            // };

            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
}
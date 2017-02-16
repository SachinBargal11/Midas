import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { Case } from '../models/case';
import { SessionStore } from '../../../commons/stores/session-store';
import { CaseAdapter } from './adapters/case-adapter';

@Injectable()
export class CaseService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/cases';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getCase(caseId: Number): Observable<Case> {
        let promise: Promise<Case> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Case/get/' + caseId).map(res => res.json())
                .subscribe((data: any) => {
                    let cases = null;
                    if (data) {
                        cases = CaseAdapter.parseResponse(data);
                        resolve(cases);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Case>>Observable.fromPromise(promise);
    }

    getCases(patientId: number): Observable<Case[]> {
        let promise: Promise<Case[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Case/getByPatientId/' + patientId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let cases = (<Object[]>data).map((data: any) => {
                        return CaseAdapter.parseResponse(data);
                    });
                    resolve(cases);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Case[]>>Observable.fromPromise(promise);
    }

    addCase(caseDetail: Case): Observable<Case> {
        let promise: Promise<Case> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/Case/Save', JSON.stringify(caseDetail), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: Case = null;
                    parsedCase = CaseAdapter.parseResponse(data);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Case>>Observable.fromPromise(promise);

    }

    updateCase(caseDetail: Case): Observable<Case> {
        let promise = new Promise((resolve, reject) => {
            return this._http.put(`${this._url}/${caseDetail.id}`, JSON.stringify(caseDetail), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: Case = null;
                    parsedCase = CaseAdapter.parseResponse(data);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Case>>Observable.fromPromise(promise);

    }

    deleteCase(caseDetail: Case): Observable<Case> {
        let promise = new Promise((resolve, reject) => {
            return this._http.delete(`${this._url}/${caseDetail.id}`)
                .map(res => res.json())
                .subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Case>>Observable.from(promise);
    }
}


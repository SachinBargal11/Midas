import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as _ from 'underscore';
import { environment } from '../../../environments/environment';
import { SessionStore } from '../../commons/stores/session-store';
import { DiagnosisCode } from '../models/diagnosis-code';
import { DiagnosisType } from '../models/diagnosis-type';
import { DiagnosisCodeAdapter } from './adapters/diagnosis-code-adapter';
import { DiagnosisTypeAdapter } from './adapters/diagnosis-type-adapter';


@Injectable()
export class DiagnosisService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getAllDiagnosisTypes(): Observable<DiagnosisType[]> {
        let promise: Promise<DiagnosisType[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DiagnosisType/getAll')
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let diagnosisTypes = (<Object[]>data).map((data: any) => {
                        return DiagnosisTypeAdapter.parseResponse(data);
                    });
                    resolve(diagnosisTypes);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<DiagnosisType[]>>Observable.fromPromise(promise);
    }
    getAllDiagnosisCodesByDiagnosisTypeId(diagnosisTypeId: number): Observable<DiagnosisCode[]> {
        let promise: Promise<DiagnosisCode[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DiagnosisCode/getByDiagnosisTypeId/' + diagnosisTypeId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let diagnosisCodes = (<Object[]>data).map((data: any) => {
                        return DiagnosisCodeAdapter.parseResponse(data);
                    });
                    resolve(diagnosisCodes);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<DiagnosisCode[]>>Observable.fromPromise(promise);
    }


}


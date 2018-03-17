import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as _ from 'underscore';
import { environment } from '../../../environments/environment';
import { SessionStore } from '../../commons/stores/session-store';
import { DiagnosisCode } from '../../commons/models/diagnosis-code';
import { DiagnosisCodeAdapter } from '../../commons/services/adapters/diagnosis-code-adapter';

@Injectable()
export class DiagnosisCodeMasterService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

  

    getDiagnosisCodeByCompanyId(companyId: number): Observable<DiagnosisCode[]> {
        let promise: Promise<DiagnosisCode[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/DiagnosisCodeCompanyMapping/getByCompanyId/' + companyId, {
                headers: this._headers
            })
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

    getDiagnosisCodesByCompanyAndDiagnosisType(companyId: number, diagnosisTypeCompnayID: number): Observable<DiagnosisCode[]> {
        let promise: Promise<DiagnosisCode[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/DiagnosisCodeCompanyMapping/getByCompanyIdAndDiagnosisType/' + companyId + '/' + diagnosisTypeCompnayID, {
                headers: this._headers
            })
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

    saveDiagnosisCodesToCompnay(requestData: DiagnosisCode[]): Observable<DiagnosisCode[]> {
        let promise: Promise<DiagnosisCode[]> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(environment.SERVICE_BASE_URL + '/DiagnosisCodeCompanyMapping/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<DiagnosisCode[]>>Observable.fromPromise(promise);
    }
   

      deleteDiagnosisCodeMapping(diagnosisCodes: DiagnosisCode): Observable<DiagnosisCode> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/DiagnosisCodeCompanyMapping/delete/' + diagnosisCodes.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: DiagnosisCode = null;
                    parsedCase = DiagnosisCodeAdapter.parseResponse(data);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<DiagnosisCode>>Observable.from(promise);
    }

   
}
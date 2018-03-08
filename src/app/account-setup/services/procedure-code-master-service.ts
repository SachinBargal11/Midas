import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as _ from 'underscore';
import { environment } from '../../../environments/environment';
import { SessionStore } from '../../commons/stores/session-store';
import { Procedure } from '../../commons/models/procedure';
import { ProcedureAdapter } from '../../commons/services/adapters/procedure-adapter';

@Injectable()
export class ProcedureCodeMasterService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }


    getProcedureCodeBySpecialtyExcludingAssigned(specialityId: number, companyId: number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCode/getProcedureCodeBySpecialtyExcludingAssigned/' + specialityId + '/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let procedures = (<Object[]>data).map((data: any) => {
                        return ProcedureAdapter.parseResponse(data);
                    });
                    resolve(procedures);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }

    getProcedureCodeByRoomTestExcludingAssigned(roomTestId: number, companyId: number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCode/getProcedureCodeByRoomTestExcludingAssigned/' + roomTestId + '/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let procedures = (<Object[]>data).map((data: any) => {
                        return ProcedureAdapter.parseResponse(data);
                    });
                    resolve(procedures);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }

    updateProcedureAmount(requestData: Procedure[]): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }

    getProceduresByCompanyId(companyId: number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/getByCompanyId/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let procedures = (<Object[]>data).map((data: any) => {
                        return ProcedureAdapter.parseResponse(data);
                    });
                    resolve(procedures);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }
    getProceduresByCompanyAndSpecialtyId(companyId: number, specialityId: number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/getByCompanyAndSpecialtyId/' + companyId + '/' + specialityId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let procedures = (<Object[]>data).map((data: any) => {
                        return ProcedureAdapter.parseResponse(data);
                    });
                    resolve(procedures);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }

    getProceduresByCompanyAndRoomTestId(companyId: number, roomTestId: number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/getByCompanyAndRoomTestId/' + companyId + '/' + roomTestId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let procedures = (<Object[]>data).map((data: any) => {
                        return ProcedureAdapter.parseResponse(data);
                    });
                    resolve(procedures);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }

      deleteProcedureMapping(procedures: Procedure): Observable<Procedure> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/delete/' + procedures.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCase: Procedure = null;
                    parsedCase = ProcedureAdapter.parseResponse(data);
                    resolve(parsedCase);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure>>Observable.from(promise);
    }

    updatePreffredProcedureMapping(procedures: Procedure): Observable<Procedure> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/UpdatePrefferedProcedureCode/' + procedures.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure>>Observable.from(promise);
    }
}
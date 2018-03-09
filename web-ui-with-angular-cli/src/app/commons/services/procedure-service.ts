import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as _ from 'underscore';
import { environment } from '../../../environments/environment';
import { SessionStore } from '../../commons/stores/session-store';
import { Procedure } from '../models/procedure';
import { ProcedureAdapter } from './adapters/procedure-adapter';


@Injectable()
export class ProcedureService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getProceduresBySpecialityId(specialityId: number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCode/getBySpecialityId/' + specialityId, {
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
    getPreferredProceduresBySpecialityId(specialityId: number, companyId:number): Observable<Procedure[]> {
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
    getPreferredProceduresBySpecialityIdForVisit(specialityId: number, companyId:number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/getByCompanyAndSpecialtyId/' + companyId + '/' + specialityId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let procedures = (<Object[]>data).map((data: any) => {
                        return ProcedureAdapter.parsePreferredResponse(data);
                    });
                    resolve(procedures);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }

    getPreferredProceduresBySpecialityIdForVisitUpdate(specialityId: number, companyId:number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/GetPreffredProcedureCodesForVisitUpdate/' + companyId + '/' + specialityId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let procedures = (<Object[]>data).map((data: any) => {
                        return ProcedureAdapter.parsePreferredResponse(data);
                    });
                    resolve(procedures);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }

    getPreferredProceduresBySpecialityIdForPVisit(specialityId: number, companyId:number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/getbySpecialtyAndCompanyIdforVisit/' + companyId + '/' + specialityId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let procedures = (<Object[]>data).map((data: any) => {
                        return ProcedureAdapter.parsePreferredResponse(data);
                    });
                    resolve(procedures);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }
    getAllProceduresBySpecialityIdForVisit(specialityId: number, companyId:number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/getAllByCompanyAndSpecialtyId/' + companyId + '/' + specialityId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let procedures = (<Object[]>data).map((data: any) => {
                        return ProcedureAdapter.parsePreferredResponse(data);
                    });
                    resolve(procedures);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }
    getProceduresByRoomTestId(roomTestId: number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCode/getByRoomTestId/' + roomTestId, {
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
    getPrefferedProceduresByRoomTestId(roomTestId: number, companyId:number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/getByCompanyAndSpecialtyId/' + companyId + '/' + roomTestId, {
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
    getPrefferedProceduresByRoomTestIdForVisit(roomTestId: number, companyId:number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/getByCompanyAndRoomTestIdForVisit/' + companyId + '/' + roomTestId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let procedures = (<Object[]>data).map((data: any) => {
                        return ProcedureAdapter.parsePreferredResponse(data);
                    });
                    resolve(procedures);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }

    getAllProceduresByRoomTestIdForVisit(roomTestId: number, companyId:number): Observable<Procedure[]> {
        let promise: Promise<Procedure[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/ProcedureCodeCompanyMapping/getAllByCompanyAndRoomTestIdForVisit/' + companyId + '/' + roomTestId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let procedures = (<Object[]>data).map((data: any) => {
                        return ProcedureAdapter.parsePreferredResponse(data);
                    });
                    resolve(procedures);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }
}


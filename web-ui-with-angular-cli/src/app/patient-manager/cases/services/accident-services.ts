import { Accident } from '../models/accident';
import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { AccidentAdapter } from './adapters/accident-adapter';


@Injectable()
export class AccidentService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }
    getAccident(accidentId: Number): Observable<Accident> {
        let promise: Promise<Accident> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientAccidentInfo/get/' + accidentId, {
                headers: this._headers
            }).map(res => res.json())
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
        return <Observable<Accident>>Observable.fromPromise(promise);
    }

    getAccidents(caseId: Number): Observable<Accident[]> {

        let promise: Promise<Accident[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientAccidentInfo/getByCaseId/' + caseId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let accidents = (<Object[]>data).map((data: any) => {

                        return AccidentAdapter.parseResponse(data);
                    });
                    resolve(accidents);

                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Accident[]>>Observable.fromPromise(promise);
    }
    addAccident(accident: Accident): Observable<Accident> {
        let promise: Promise<Accident> = new Promise((resolve, reject) => {
            let requestData: any = accident.toJS();
            requestData.accidentDate = requestData.accidentDate ? requestData.accidentDate.format('YYYY-MM-DD') : null;
            requestData.dateOfAdmission = requestData.dateOfAdmission ? requestData.dateOfAdmission.format('YYYY-MM-DD') : null;
            requestData.accidentAddressInfo = requestData.accidentAddress;
            requestData.hospitalAddressInfo = requestData.hospitalAddress;

            requestData = _.omit(requestData, 'accidentAdress', 'hospitalAddress');
            return this._http.post(this._url + '/PatientAccidentInfo/Save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedAccident: Accident = null;
                    parsedAccident = AccidentAdapter.parseResponse(data);
                    resolve(parsedAccident);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Accident>>Observable.fromPromise(promise);
    }
    updateAccident(accident: Accident, accidentId: number): Observable<Accident> {
        debugger;
        let promise = new Promise((resolve, reject) => {
            let requestData: any = accident.toJS();
            requestData.accidentDate = requestData.accidentDate ? requestData.accidentDate.format('YYYY-MM-DD') : null;
            requestData.dateOfAdmission = requestData.dateOfAdmission ? requestData.dateOfAdmission.format('YYYY-MM-DD') : null;
            requestData.id = accidentId;
            requestData.accidentAddressInfo = requestData.accidentAddress;
            requestData.hospitalAddressInfo = requestData.hospitalAddress;
            requestData.medicalReportNumber = requestData.medicalReportNumber;
            requestData = _.omit(requestData, 'accidentAddress', 'hospitalAddress');
            return this._http.post(this._url + '/PatientAccidentInfo/Save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedAccident: Accident = null;
                    parsedAccident = AccidentAdapter.parseResponse(data);
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Accident>>Observable.fromPromise(promise);
    }
    deleteAccident(accident: Accident): Observable<Accident> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientAccidentInfo/Delete/' + accident.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    let parsedAccident: Accident = null;
                    parsedAccident = AccidentAdapter.parseResponse(data);
                    resolve(parsedAccident);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Accident>>Observable.from(promise);
    }
}

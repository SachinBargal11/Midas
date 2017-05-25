import { SessionStore } from '../../../commons/stores/session-store';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Employer } from '../models/employer';
import { EmployerAdapter } from './adapters/employer-adapter';

@Injectable()
export class EmployerService {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/employer';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }
    getEmployer(employerId: Number): Observable<Employer> {
        let promise: Promise<Employer> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientEmpInfo/get/' + employerId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    let employer = null;
                    if (data.length) {
                        employer = EmployerAdapter.parseResponse(data);
                        resolve(employer);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Employer>>Observable.fromPromise(promise);
    }

    getEmployers(patientId: Number): Observable<Employer[]> {
        let promise: Promise<Employer[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientEmpInfo/getByPatientId/' + patientId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let employers = (<Object[]>data).map((data: any) => {
                        return EmployerAdapter.parseResponse(data);
                    });
                    resolve(employers);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Employer[]>>Observable.fromPromise(promise);
    }
    getCurrentEmployer(patientId: Number): Observable<Employer> {
        let promise: Promise<Employer> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientEmpInfo/getCurrentEmpByPatientId/' + patientId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data) => {
                    let employer = null;
                    employer = EmployerAdapter.parseResponse(data);
                    resolve(employer);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Employer>>Observable.fromPromise(promise);
    }
    addEmployer(employer: Employer): Observable<Employer> {
        let promise: Promise<Employer> = new Promise((resolve, reject) => {
            let requestData: any = employer.toJS();
            requestData.contactInfo = requestData.contact;
            requestData.addressInfo = requestData.address;
            requestData = _.omit(requestData, 'contact', 'address');
            return this._http.post(this._url + '/PatientEmpInfo/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedEmployer: Employer = null;
                    parsedEmployer = EmployerAdapter.parseResponse(data);
                    resolve(parsedEmployer);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Employer>>Observable.fromPromise(promise);
    }
    updateEmployer(employer: Employer, empId: number): Observable<Employer> {
        let promise = new Promise((resolve, reject) => {
            let requestData: any = employer.toJS();
            requestData.id = empId;
            requestData.contactInfo = requestData.contact;
            requestData.addressInfo = requestData.address;
            requestData = _.omit(requestData, 'contact', 'address');
            return this._http.post(this._url + '/PatientEmpInfo/save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedEmployer: Employer = null;
                    parsedEmployer = EmployerAdapter.parseResponse(data);
                    resolve(parsedEmployer);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Employer>>Observable.fromPromise(promise);
    }
    deleteEmployer(employer: Employer): Observable<Employer> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientEmpInfo/Delete/' + employer.id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data) => {
                    let parsedEmployer: Employer = null;
                    parsedEmployer = EmployerAdapter.parseResponse(data);
                    resolve(parsedEmployer);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Employer>>Observable.from(promise);
    }
}

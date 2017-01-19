import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/environment';
import {Patient} from '../models/patient';
import {SessionStore} from '../../../commons/stores/session-store';
import {PatientAdapter} from './adapters/patient-adapter';

@Injectable()
export class PatientsService {

    private _url: string = `${environment.SERVICE_BASE_URL}/patients`;
    // private _url: string = 'http://localhost:3004/patients';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getPatient(patientId: Number): Observable<Patient> {
        let promise: Promise<Patient> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '?id=' + patientId).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    let patient = null;
                    if (data.length) {
                        patient = PatientAdapter.parseResponse(data[0]);
                        resolve(patient);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Patient>>Observable.fromPromise(promise);
    }

    getPatients(): Observable<Patient[]> {
        let promise: Promise<Patient[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patients = (<Object[]>data).map((patientData: any) => {
                        return PatientAdapter.parseResponse(patientData);
                    });
                    resolve(patients);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Patient[]>>Observable.fromPromise(promise);
    }

    addPatient(patient: Patient): Observable<Patient> {
        let promise: Promise<Patient> = new Promise((resolve, reject) => {
            return this._http.post(this._url, JSON.stringify(patient), {
                headers: this._headers
            })
            .map(res => res.json())
            .subscribe((patientData: any) => {
                let parsedPatient: Patient = null;
                parsedPatient = PatientAdapter.parseResponse(patientData);
                resolve(parsedPatient);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<Patient>>Observable.fromPromise(promise);

    }

    updatePatient(patient: Patient): Observable<Patient> {
        let promise = new Promise((resolve, reject) => {
            return this._http.put(`${this._url}/${patient.id}`, JSON.stringify(patient), {
                headers: this._headers
            })
            .map(res => res.json())
            .subscribe((patientData: any) => {
                let parsedPatient: Patient = null;
                parsedPatient = PatientAdapter.parseResponse(patientData);
                resolve(parsedPatient);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<Patient>>Observable.fromPromise(promise);

    }

    deletePatient(patient: Patient): Observable<Patient> {
        let promise = new Promise((resolve, reject) => {
            return this._http.delete(`${this._url}/${patient.id}`)
                .map(res => res.json())
                .subscribe((patient) => {
                    resolve(patient);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Patient>>Observable.from(promise);
    }
}


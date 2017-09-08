import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { environment } from '../../../environments/environment';
import { Patient } from '../../patient-manager/patients/models/patient';
import { SessionStore } from '../../commons/stores/session-store';
import { PatientAdapter } from '../../patient-manager/patients/services/adapters/patient-adapter';
import { Doctor } from '../../medical-provider/users/models/doctor';
import { DoctorAdapter } from '../../medical-provider/users/services/adapters/doctor-adapter';


@Injectable()
export class AssociateUserService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/patients';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    associatePatientWithCompany(patientId: Number, companyId: Number): Observable<Patient> {
        let promise: Promise<Patient> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Patient/AssociatePatientWithCompany/' + patientId + '/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let patient = null;
                    patient = PatientAdapter.parseResponse(data);
                    resolve(patient);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Patient>>Observable.fromPromise(promise);
    }

    associateDoctorWithCompany(doctorId: Number, companyId: Number): Observable<Doctor> {
        let promise: Promise<Doctor> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Doctor/AssociateDoctorWithCompany/' + doctorId + '/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let doctor = null;
                    doctor = DoctorAdapter.parseResponse(data);
                    resolve(doctor);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Doctor>>Observable.fromPromise(promise);
    }
}
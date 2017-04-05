import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { Patient } from '../models/patient';
import { SessionStore } from '../../../commons/stores/session-store';
import { PatientAdapter } from './adapters/patient-adapter';

@Injectable()
export class PatientsService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
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
            return this._http.get(this._url + '/Patient/getPatientById/' + patientId).map(res => res.json())
                .subscribe((data: Array<any>) => {
                    let patient = null;
                    if (data) {
                        patient = PatientAdapter.parseResponse(data);
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

    getPatientsWithOpenCases() {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise: Promise<Patient[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Patient/getByCompanyWithOpenCases/' + companyId)
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

    getPatients(): Observable<Patient[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise: Promise<Patient[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Patient/getPatientsByCompanyId/' + companyId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patients = (<Object[]>data).map((patientData: any) => {
                        return PatientAdapter.parseResponse(patientData);
                    });
                    resolve(patients);
                    // resolve(data);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Patient[]>>Observable.fromPromise(promise);
    }
    getPatientsByCompanyAndDoctorId(): Observable<Patient[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let doctorId: number = this._sessionStore.session.user.id;
        let promise: Promise<Patient[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Patient/getByCompanyAndDoctorId/' + companyId + '/' + doctorId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patients = (<Object[]>data).map((patientData: any) => {
                        return PatientAdapter.parseResponse(patientData);
                    });
                    resolve(patients);
                    // resolve(data);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Patient[]>>Observable.fromPromise(promise);
    }


    getPatientsWithNoCase(): Observable<Patient[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise: Promise<Patient[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Patient/getByCompanyWithCloseCases/' + companyId)
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patients = (<Object[]>data).map((patientData: any) => {
                        return PatientAdapter.parseResponse(patientData);
                    });
                    resolve(patients);
                    // resolve(data);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Patient[]>>Observable.fromPromise(promise);
    }

    addPatient(patient: Patient): Observable<Patient> {
        let promise: Promise<Patient> = new Promise((resolve, reject) => {
            let requestData: any = patient.toJS();
            requestData.user.dateOfBirth = requestData.user.dateOfBirth ? requestData.user.dateOfBirth.format('YYYY-MM-DD') : null;
            requestData.dateOfFirstTreatment = requestData.dateOfFirstTreatment ? requestData.dateOfFirstTreatment.format('YYYY-MM-DD') : null;
            requestData.user.contactInfo = requestData.user.contact;
            requestData.user.addressInfo = requestData.user.address;
            requestData.user = _.omit(requestData.user, 'contact', 'address');
            requestData = _.extend(requestData, {
                attorneyname: 'simon',
                attorneyAddressInfo: {
                    name: 'mumbai----'
                },
                attorneyContactInfo: {
                    name: 'sergi----'
                }
            });
            requestData.user = _.extend(requestData.user, {
                UserCompanies: [{
                    company: {
                        id: this._sessionStore.session.currentCompany.id
                    }
                }]
            });

            return this._http.post(this._url + '/patient/savePatient', JSON.stringify(requestData), {
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
        let promise: Promise<Patient> = new Promise((resolve, reject) => {
            let requestData: any = patient.toJS();
            requestData.dateOfFirstTreatment = requestData.dateOfFirstTreatment ? requestData.dateOfFirstTreatment.format('YYYY-MM-DD') : null;
            requestData.user.dateOfBirth = requestData.user.dateOfBirth ? requestData.user.dateOfBirth.format('YYYY-MM-DD') : null;
            requestData.user.contactInfo = requestData.user.contact;
            requestData.user.addressInfo = requestData.user.address;
            // requestData.user = _.extend(requestData.user, {
            //     UserCompanies: [{
            //         CompanyId: this._sessionStore.session.currentCompany.id
            //     }]
            // });
            requestData.user = _.omit(requestData.user, 'contact', 'address');
            return this._http.post(this._url + '/patient/savePatient', JSON.stringify(requestData), {
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
        let promise: Promise<Patient> = new Promise((resolve, reject) => {
            let requestData: any = patient.toJS();
            requestData.isDeleted = 1;
            requestData.user.contactInfo = requestData.user.contact;
            requestData.user.addressInfo = requestData.user.address;
            requestData.user = _.omit(requestData.user, 'contact', 'address');
            requestData = _.extend(requestData, {
                attorneyname: 'simon',
                attorneyAddressInfo: {
                    name: 'mumbai----'
                },
                attorneyContactInfo: {
                    name: 'sergi----'
                }
            });
            return this._http.post(this._url + '/patient/savePatient', JSON.stringify(requestData), {
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
}


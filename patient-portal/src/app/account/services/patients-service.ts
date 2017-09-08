import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { environment } from '../../../environments/environment';
import { Patient } from '../models/patient';
import { SessionStore } from '../../commons/stores/session-store';
import { PatientAdapter } from './adapters/patient-adapter';

@Injectable()
export class PatientsService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/patients';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        public sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this.sessionStore.session.accessToken);
    }

    getPatient(patientId: Number): Observable<Patient> {
        let promise: Promise<Patient> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Patient/getPatientById/' + patientId, {
                headers: this._headers
            }).map(res => res.json())
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

    // getPatients(): Observable<Patient[]> {
    //     // let companyId: number = this.sessionStore.session.currentCompany.id;
    //     let promise: Promise<Patient[]> = new Promise((resolve, reject) => {
    //         // return this._http.get(environment.SERVICE_BASE_URL + '/Patient/getPatientsByCompanyId/' + companyId)
    //         return this._http.get(environment.SERVICE_BASE_URL + '/Patient/getPatientsByCompanyId/')
    //             .map(res => res.json())
    //             .subscribe((data: Array<Object>) => {
    //                 let patients = (<Object[]>data).map((patientData: any) => {
    //                     return PatientAdapter.parseResponse(patientData);
    //                 });
    //                 resolve(patients);
    //                 // resolve(data);
    //             }, (error) => {
    //                 reject(error);
    //             });

    //     });
    //     return <Observable<Patient[]>>Observable.fromPromise(promise);
    // }

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

            return this._http.post(environment.SERVICE_BASE_URL + '/patient/savePatient', JSON.stringify(requestData), {
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
            requestData.user = _.omit(requestData.user, 'contact', 'address');
            // requestData = _.extend(requestData, {
            //     attorneyname: 'simon',
            //     attorneyAddressInfo: {
            //         name: 'mumbai----'
            //     },
            //     attorneyContactInfo: {
            //         name: 'sergi----'
            //     }
            // });
            return this._http.post(environment.SERVICE_BASE_URL + '/patient/savePatient', JSON.stringify(requestData), {
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
            return this._http.post(environment.SERVICE_BASE_URL + '/patient/savePatient', JSON.stringify(requestData), {
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


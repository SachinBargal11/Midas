import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Patient} from '../models/patient';
import Moment from 'moment';
import {SessionStore} from '../stores/session-store';


@Injectable()
export class PatientsService {

    private _url = "http://localhost:3004/patients";
    private _headers = new Headers();


    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getPatients() {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(this._url + "?createdUser=" + this._sessionStore.session.user.id).map(res => res.json())
                .subscribe((data) => {
                    let patients = (<Object[]>data).map((patientData: Patient) =>
                        new Patient({
                            id: patientData.id,
                            firstname: patientData.firstname,
                            lastname: patientData.lastname,
                            email: patientData.email,
                            mobileNo: patientData.mobileNo,
                            address: patientData.address,
                            dob: Moment(patientData.dob)
                        }));
                    resolve(patients);
                }, (error) => {
                    reject(error);
                });

        });
        return Observable.from(promise);
    }

    addPatient(patient: Patient) {
        let promise = new Promise((resolve, reject) => {
            return this._http.post(this._url, JSON.stringify(patient), {
                headers: this._headers
            }).map(res => res.json()).subscribe((patientData) => {
                let parsedPatient = new Patient({
                    id: patientData.id,
                    firstname: patientData.firstname,
                    lastname: patientData.lastname,
                    email: patientData.email,
                    mobileNo: patientData.mobileNo,
                    address: patientData.address,
                    dob: Moment(patientData.dob)
                });
                resolve(parsedPatient);
            }, (error) => {
                reject(error);
            });
        });
        return Observable.from(promise);

    }

    updatePatient(patient: Patient) {
        let promise = new Promise((resolve, reject) => {
            return this._http.put(`${this._url}/${patient.id}`, JSON.stringify(patient), {
                headers: this._headers
            }).map(res => res.json()).subscribe((patient) => {
                resolve(patient);
            }, (error) => {
                reject(error);
            });
        });
        return Observable.from(promise);

    }

    deletePatient(patientId: number) {
        let promise = new Promise((resolve, reject) => {
            return this._http.delete(`${this._url}/${patientId}`)
                .map(res => res.json()).subscribe((patient) => {
                    resolve(patient);
                }, (error) => {
                    reject(error);
                });
        });
        return Observable.from(promise);
    }
}
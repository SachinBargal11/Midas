import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Patient } from '../../patient-manager/patients/models/patient';
import { Doctor } from '../../medical-provider/users/models/doctor';
import { AssociateUserService } from '../services/associate-user-service';
import { SessionStore } from './session-store';


@Injectable()
export class AssociateUserStore {

    private _patient: BehaviorSubject<List<Patient>> = new BehaviorSubject(List([]));
    private _doctor: BehaviorSubject<List<Doctor>> = new BehaviorSubject(List([]));

    constructor(
        private _associateUserService: AssociateUserService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._patient.next(this._patient.getValue().clear());
        this._doctor.next(this._doctor.getValue().clear());
    }

    associatePatientWithCompany(id: number, companyId: number): Observable<Patient> {
        let promise = new Promise((resolve, reject) => {
            this._associateUserService.associatePatientWithCompany(id, companyId).subscribe((patient: Patient) => {
                resolve(patient);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Patient>>Observable.fromPromise(promise);
    }

    associateDoctorWithCompany(id: number, companyId: number): Observable<Doctor> {
        let promise = new Promise((resolve, reject) => {
            this._associateUserService.associateDoctorWithCompany(id, companyId).subscribe((doctor: Doctor) => {
                resolve(doctor);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Doctor>>Observable.fromPromise(promise);
    }
}


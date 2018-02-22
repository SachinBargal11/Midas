import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { SessionStore } from './session-store';
import { UserSetting } from '../models/user-setting';
import { UserSettingService } from '../services/user-setting-service';


@Injectable()
export class UserSettingStore {
    private _userSetting: BehaviorSubject<List<UserSetting>> = new BehaviorSubject(List([]));

    constructor(
        private _userSettingService: UserSettingService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._userSetting.next(this._userSetting.getValue().clear());
    }

    getUserSettingById(id: number): Observable<UserSetting> {
        let promise = new Promise((resolve, reject) => {
            this._userSettingService.getUserSettingById(id).subscribe((userSetting: UserSetting) => {
                resolve(userSetting);
            }, error => {
                reject(error);
            });
        });
        return <Observable<UserSetting>>Observable.fromPromise(promise);
    }

    getPatientPersonalSettingByPatientId(patientId: number): Observable<UserSetting> {
        let promise = new Promise((resolve, reject) => {
            this._userSettingService.getPatientPersonalSettingByPatientId(patientId).subscribe((userSetting: UserSetting) => {
                // this._userSetting.next(List(userSetting));
                resolve(userSetting);
            }, error => {
                reject(error);
            });
        });
        return <Observable<UserSetting>>Observable.fromPromise(promise);
    }

    savePatientPersonalSetting(userSetting: UserSetting): Observable<UserSetting> {
        let promise = new Promise((resolve, reject) => {
            this._userSettingService.savePatientPersonalSetting(userSetting).subscribe((userSetting: UserSetting) => {
                // this._userSetting.next(this._userSetting.getValue().push(userSetting));
                resolve(userSetting);
            }, error => {
                reject(error);
            });
        });
        return <Observable<UserSetting>>Observable.from(promise);
    }
}

//     updatePatient(patient: Patient): Observable<Patient> {
//         let promise = new Promise((resolve, reject) => {
//             this._patientsService.updatePatient(patient).subscribe((updatedPatient: Patient) => {
//                 let patientDetails: List<Patient> = this._patients.getValue();
//                 let index = patientDetails.findIndex((currentPatient: Patient) => currentPatient.id === updatedPatient.id);
//                 patientDetails = patientDetails.update(index, function () {
//                     return updatedPatient;
//                 });
//                 this._patients.next(patientDetails);
//                 resolve(patient);
//             }, error => {
//                 reject(error);
//             });
//         });
//         return <Observable<Patient>>Observable.from(promise);
//     }


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { DoctorLocationSpeciality } from '../models/doctor-location-speciality';
import { DoctorLocationSpecialityService } from '../services/doctor-location-speciality-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class DoctorLocationSpecialityStore {

    private _doctorLocationSpecialities: BehaviorSubject<List<DoctorLocationSpeciality>> = new BehaviorSubject(List([]));

    constructor(
        private _doctorLocationSpecialityService: DoctorLocationSpecialityService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }
    resetStore() {
        this._doctorLocationSpecialities.next(this._doctorLocationSpecialities.getValue().clear());
    }

    get doctorLocationSchedules() {
        return this._doctorLocationSpecialities.asObservable();
    }

    getDoctorLocationSpecialities(locationId: number): Observable<DoctorLocationSpeciality[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationSpecialityService.getDoctorLocationSpecialityByLocationId(locationId)
                .subscribe((doctorLocationSpecialities: DoctorLocationSpeciality[]) => {
                    this._doctorLocationSpecialities.next(List(doctorLocationSpecialities));
                    resolve(doctorLocationSpecialities);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSpeciality[]>>Observable.fromPromise(promise);
    }

    getDoctorLocationSpeciality(doctorLocationSpecialityId: number): Observable<DoctorLocationSpeciality> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationSpecialityService.getDoctorLocationSpeciality(doctorLocationSpecialityId)
                .subscribe((doctorLocationSpeciality: DoctorLocationSpeciality) => {
                    resolve(doctorLocationSpeciality);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSpeciality>>Observable.fromPromise(promise);
    }
    getDoctorLocationSpecialityByLocationId(id: number): Observable<DoctorLocationSpeciality[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationSpecialityService.getDoctorLocationSpecialityByLocationId(id)
                .subscribe((doctorLocationSpecialities: DoctorLocationSpeciality[]) => {
                    resolve(doctorLocationSpecialities);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSpeciality[]>>Observable.fromPromise(promise);
    }
    getDoctorLocationSpecialityByDoctorId(doctorId: number): Observable<DoctorLocationSpeciality[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationSpecialityService.getDoctorLocationSpecialityByDoctorId(doctorId)
                .subscribe((doctorLocationSpecialities: DoctorLocationSpeciality[]) => {
                    resolve(doctorLocationSpecialities);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSpeciality[]>>Observable.fromPromise(promise);
    }

    getDoctorLocationSpecialityByDoctorIdAndLocationId(doctorId: number, locationId: number): Observable<DoctorLocationSpeciality> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationSpecialityService.getDoctorLocationSpecialityByDoctorIdAndLocationId(doctorId, locationId)
                .subscribe((doctorLocationSpecialities: DoctorLocationSpeciality) => {
                    resolve(doctorLocationSpecialities);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSpeciality>>Observable.fromPromise(promise);
    }


    fetchDoctorLocationSpecialityById(id: number): Observable<DoctorLocationSpeciality> {
        let promise = new Promise((resolve, reject) => {
            let matchedDoctorLocationSpeciality: DoctorLocationSpeciality = this.findDoctorLocationSpecialityById(id);
            if (matchedDoctorLocationSpeciality) {
                resolve(matchedDoctorLocationSpeciality);
            } else {
                this._doctorLocationSpecialityService.getDoctorLocationSpeciality(id)
                    .subscribe((doctorLocationSpeciality: DoctorLocationSpeciality) => {
                        resolve(doctorLocationSpeciality);
                    }, error => {
                        reject(error);
                    });
            }
        });
        return <Observable<DoctorLocationSpeciality>>Observable.fromPromise(promise);
    }

    findDoctorLocationSpecialityById(id: number) {
        let doctorLocationSpecialities= this._doctorLocationSpecialities.getValue();
        let index = doctorLocationSpecialities.findIndex((currentDoctorLocationSpeciality: DoctorLocationSpeciality) =>
            currentDoctorLocationSpeciality.id === id);
        return doctorLocationSpecialities.get(index);
    }

    associateLocationToDoctors(doctorLocationSpecialities: DoctorLocationSpeciality[]): Observable<DoctorLocationSpeciality[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationSpecialityService.associateLocationToDoctors(doctorLocationSpecialities)
                .subscribe((updatedDoctorLocationSpecialities: DoctorLocationSpeciality[]) => {
                    resolve(doctorLocationSpecialities);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSpeciality[]>>Observable.from(promise);
    }
    associateDoctorToLocations(doctorLocationSpecialities: DoctorLocationSpeciality[]): Observable<DoctorLocationSpeciality[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationSpecialityService.associateDoctorToLocations(doctorLocationSpecialities)
                .subscribe((updatedDoctorLocationSpecialities: DoctorLocationSpeciality[]) => {
                    resolve(doctorLocationSpecialities);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSpeciality[]>>Observable.from(promise);
    }


    deleteDoctorLocationSSpeciality(doctorLocationSpeciality: DoctorLocationSpeciality) {
        let doctorLocationSpecialities = this._doctorLocationSpecialities.getValue();
        let index = doctorLocationSpecialities.findIndex((currentDoctorLocationSpeciality: DoctorLocationSpeciality) =>
            currentDoctorLocationSpeciality.id === doctorLocationSpeciality.id);
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationSpecialityService.deleteDoctorLocationSSpeciality(doctorLocationSpeciality)
                .subscribe((doctorLocationSchedule: DoctorLocationSpeciality) => {
                    this._doctorLocationSpecialities.next(doctorLocationSpecialities.delete(index));
                    resolve(doctorLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSpeciality>>Observable.from(promise);
    }


}
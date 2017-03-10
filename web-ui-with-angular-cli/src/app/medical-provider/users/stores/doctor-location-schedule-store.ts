import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { DoctorLocationSchedule } from '../models/doctor-location-schedule';
import { DoctorLocationScheduleService } from '../services/doctor-location-schedule-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import { Schedule } from '../../locations/models/schedule';

@Injectable()
export class DoctorLocationScheduleStore {

    private _doctorLocationSchedules: BehaviorSubject<List<DoctorLocationSchedule>> = new BehaviorSubject(List([]));

    constructor(
        private _doctorLocationScheduleService: DoctorLocationScheduleService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }
    resetStore() {
        this._doctorLocationSchedules.next(this._doctorLocationSchedules.getValue().clear());
    }

    get doctorLocationSchedules() {
        return this._doctorLocationSchedules.asObservable();
    }

    // getDoctorLocationSchedulesByDoctorId(doctorId: number): Observable<DoctorLocationSchedule[]> {
    //     let promise = new Promise((resolve, reject) => {
    //         this._doctorLocationScheduleService.getDoctorLocationScheduleByDoctorId(doctorId)
    //             .subscribe((doctorLocationSchedules: DoctorLocationSchedule[]) => {
    //                 this._doctorLocationSchedules.next(List(doctorLocationSchedules));
    //                 resolve(doctorLocationSchedules);
    //             }, error => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<DoctorLocationSchedule[]>>Observable.fromPromise(promise);
    // }

    getDoctorLocationSchedulesByLocationId(locationId: number): Observable<DoctorLocationSchedule[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationScheduleService.getDoctorLocationScheduleByLocationId(locationId)
                .subscribe((doctorLocationSchedules: DoctorLocationSchedule[]) => {
                    this._doctorLocationSchedules.next(List(doctorLocationSchedules));
                    resolve(doctorLocationSchedules);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule[]>>Observable.fromPromise(promise);
    }

    getDoctorLocationSchedule(scheduleId: number): Observable<DoctorLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationScheduleService.getDoctorLocationSchedule(scheduleId)
                .subscribe((doctorLocationSchedule: DoctorLocationSchedule) => {
                    resolve(doctorLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule>>Observable.fromPromise(promise);
    }
    getDoctorLocationScheduleByLocationId(id: number): Observable<DoctorLocationSchedule[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationScheduleService.getDoctorLocationScheduleByLocationId(id)
                .subscribe((doctorLocationSchedule: DoctorLocationSchedule[]) => {
                    resolve(doctorLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule[]>>Observable.fromPromise(promise);
    }
    getDoctorLocationScheduleByDoctorId(doctorId: number): Observable<DoctorLocationSchedule[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationScheduleService.getDoctorLocationScheduleByDoctorId(doctorId)
                .subscribe((doctorLocationSchedule: DoctorLocationSchedule[]) => {
                    resolve(doctorLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule[]>>Observable.fromPromise(promise);
    }

    getDoctorLocationScheduleByDoctorIdAndLocationId(doctorId: number, locationId: number): Observable<DoctorLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationScheduleService.getDoctorLocationScheduleByDoctorIdAndLocationId(doctorId, locationId)
                .subscribe((doctorLocationSchedule: DoctorLocationSchedule) => {
                    resolve(doctorLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule>>Observable.fromPromise(promise);
    }


    fetchDoctorLocationScheduleById(id: number): Observable<DoctorLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            let matchedDoctorLocationSchedule: DoctorLocationSchedule = this.findDoctorLocationScheduleById(id);
            if (matchedDoctorLocationSchedule) {
                resolve(matchedDoctorLocationSchedule);
            } else {
                this._doctorLocationScheduleService.getDoctorLocationSchedule(id)
                    .subscribe((doctorLocationSchedule: DoctorLocationSchedule) => {
                        resolve(doctorLocationSchedule);
                    }, error => {
                        reject(error);
                    });
            }
        });
        return <Observable<DoctorLocationSchedule>>Observable.fromPromise(promise);
    }

    findDoctorLocationScheduleById(id: number) {
        let doctorLocationSchedules = this._doctorLocationSchedules.getValue();
        let index = doctorLocationSchedules.findIndex((currentDoctorLocationSchedule: DoctorLocationSchedule) =>
            currentDoctorLocationSchedule.id === id);
        return doctorLocationSchedules.get(index);
    }

    addDoctorLocationSchedule(doctorLocationSchedule: DoctorLocationSchedule): Observable<DoctorLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationScheduleService.addDoctorLocationSchedule(doctorLocationSchedule)
                .subscribe((doctorLocationSchedule: DoctorLocationSchedule) => {
                    this._doctorLocationSchedules.next(this._doctorLocationSchedules.getValue().push(doctorLocationSchedule));
                    resolve(doctorLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule>>Observable.from(promise);
    }
    updateDoctorLocationSchedule(doctorLocationSchedule: DoctorLocationSchedule): Observable<DoctorLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationScheduleService.updateDoctorLocationSchedule(doctorLocationSchedule)
                .subscribe((updatedDoctorLocationSchedule: DoctorLocationSchedule) => {
                    let doctorLocationSchedule: List<DoctorLocationSchedule> = this._doctorLocationSchedules.getValue();
                    let index = doctorLocationSchedule.findIndex((currentDoctorLocationSchedule: DoctorLocationSchedule) =>
                        currentDoctorLocationSchedule.id === updatedDoctorLocationSchedule.id);
                    doctorLocationSchedule = doctorLocationSchedule.update(index, function () {
                        return updatedDoctorLocationSchedule;
                    });
                    this._doctorLocationSchedules.next(doctorLocationSchedule);
                    resolve(doctorLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule>>Observable.from(promise);
    }
    updateScheduleForLocation(doctorLocationSchedule: DoctorLocationSchedule, schedule: Schedule): Observable<DoctorLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationScheduleService.updateScheduleForLocation(doctorLocationSchedule, schedule)
                .subscribe((updatedDoctorLocationSchedule: DoctorLocationSchedule) => {
                    let doctorLocationSchedule: List<DoctorLocationSchedule> = this._doctorLocationSchedules.getValue();
                    let index = doctorLocationSchedule.findIndex((currentDoctorLocationSchedule: DoctorLocationSchedule) =>
                        currentDoctorLocationSchedule.id === updatedDoctorLocationSchedule.id);
                    doctorLocationSchedule = doctorLocationSchedule.update(index, function () {
                        return updatedDoctorLocationSchedule;
                    });
                    this._doctorLocationSchedules.next(doctorLocationSchedule);
                    resolve(doctorLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule>>Observable.from(promise);
    }

    associateDoctorsToLocation(doctorLocationSchedule: DoctorLocationSchedule[]): Observable<DoctorLocationSchedule[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationScheduleService.associateDoctorsToLocation(doctorLocationSchedule)
                .subscribe((updatedDoctorLocationSchedule: DoctorLocationSchedule[]) => {
                    resolve(doctorLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule[]>>Observable.from(promise);
    }
    associateLocationsToDoctor(doctorLocationSchedule: DoctorLocationSchedule[]): Observable<DoctorLocationSchedule[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationScheduleService.associateLocationsToDoctor(doctorLocationSchedule)
                .subscribe((updatedDoctorLocationSchedule: DoctorLocationSchedule[]) => {
                    resolve(doctorLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule[]>>Observable.from(promise);
    }


    deleteDoctorLocationSchedule(doctorLocationSchedule: DoctorLocationSchedule) {
        let doctorLocationSchedules = this._doctorLocationSchedules.getValue();
        let index = doctorLocationSchedules.findIndex((currentDoctorLocationSchedule: DoctorLocationSchedule) =>
            currentDoctorLocationSchedule.id === doctorLocationSchedule.id);
        let promise = new Promise((resolve, reject) => {
            this._doctorLocationScheduleService.deleteDoctorLocationSchedule(doctorLocationSchedule)
                .subscribe((doctorLocationSchedule: DoctorLocationSchedule) => {
                    this._doctorLocationSchedules.next(doctorLocationSchedules.delete(index));
                    resolve(doctorLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<DoctorLocationSchedule>>Observable.from(promise);
    }


}
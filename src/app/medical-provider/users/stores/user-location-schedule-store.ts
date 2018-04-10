import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { UserLocationSchedule } from '../models/user-location-schedule';
import { UserLocationScheduleService } from '../services/user-location-schedule-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import { Schedule } from '../../locations/models/schedule';

@Injectable()
export class UserLocationScheduleStore {

    private _userLocationSchedules: BehaviorSubject<List<UserLocationSchedule>> = new BehaviorSubject(List([]));

    constructor(
        private _userLocationScheduleService: UserLocationScheduleService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }
    resetStore() {
        this._userLocationSchedules.next(this._userLocationSchedules.getValue().clear());
    }

    get userLocationSchedules(): BehaviorSubject<List<UserLocationSchedule>> {
        return this._userLocationSchedules;
    }

    getUserLocationSchedulesByLocationId(locationId: number): Observable<UserLocationSchedule[]> {
        let promise = new Promise((resolve, reject) => {
            this._userLocationScheduleService.getUserLocationScheduleByLocationId(locationId)
                .subscribe((userLocationSchedules: UserLocationSchedule[]) => {
                    this._userLocationSchedules.next(List(userLocationSchedules));
                    resolve(userLocationSchedules);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule[]>>Observable.fromPromise(promise);
    }

    getUserLocationSchedule(scheduleId: number): Observable<UserLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            this._userLocationScheduleService.getUserLocationSchedule(scheduleId)
                .subscribe((userLocationSchedule: UserLocationSchedule) => {
                    resolve(userLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule>>Observable.fromPromise(promise);
    }

    getUserLocationScheduleByLocationId(id: number): Observable<UserLocationSchedule[]> {
        let promise = new Promise((resolve, reject) => {
            this._userLocationScheduleService.getUserLocationScheduleByLocationId(id)
                .subscribe((userLocationSchedule: UserLocationSchedule[]) => {
                    resolve(userLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule[]>>Observable.fromPromise(promise);
    }

    getUserLocationScheduleByUserId(userId: number): Observable<UserLocationSchedule[]> {
        let promise = new Promise((resolve, reject) => {
            this._userLocationScheduleService.getUserLocationScheduleByUserId(userId)
                .subscribe((userLocationSchedule: UserLocationSchedule[]) => {
                    resolve(userLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule[]>>Observable.fromPromise(promise);
    }

    getUserLocationScheduleByUserIdAndLocationId(userId: number, locationId: number): Observable<UserLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            this._userLocationScheduleService.getUserLocationScheduleByUserIdAndLocationId(userId, locationId)
                .subscribe((userLocationSchedule: UserLocationSchedule) => {
                    resolve(userLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule>>Observable.fromPromise(promise);
    }


    fetchUserLocationScheduleById(id: number): Observable<UserLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            let matchedUserLocationSchedule: UserLocationSchedule = this.findUserLocationScheduleById(id);
            if (matchedUserLocationSchedule) {
                resolve(matchedUserLocationSchedule);
            } else {
                this._userLocationScheduleService.getUserLocationSchedule(id)
                    .subscribe((userLocationSchedule: UserLocationSchedule) => {
                        resolve(userLocationSchedule);
                    }, error => {
                        reject(error);
                    });
            }
        });
        return <Observable<UserLocationSchedule>>Observable.fromPromise(promise);
    }

    findUserLocationScheduleById(id: number) {
        let userLocationSchedules = this._userLocationSchedules.getValue();
        let index = userLocationSchedules.findIndex((currentUserLocationSchedule: UserLocationSchedule) =>
        currentUserLocationSchedule.id === id);
        return userLocationSchedules.get(index);
    }

    addUserLocationSchedule(userLocationSchedule: UserLocationSchedule): Observable<UserLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            this._userLocationScheduleService.addUserLocationSchedule(userLocationSchedule)
                .subscribe((userLocationSchedule: UserLocationSchedule) => {
                    this._userLocationSchedules.next(this._userLocationSchedules.getValue().push(userLocationSchedule));
                    resolve(userLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule>>Observable.from(promise);
    }

    updateUserLocationSchedule(userLocationSchedule: UserLocationSchedule): Observable<UserLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            this._userLocationScheduleService.updateUserLocationSchedule(userLocationSchedule)
                .subscribe((updatedUserLocationSchedule: UserLocationSchedule) => {
                    let userLocationSchedule: List<UserLocationSchedule> = this._userLocationSchedules.getValue();
                    let index = userLocationSchedule.findIndex((currentUserLocationSchedule: UserLocationSchedule) =>
                        currentUserLocationSchedule.id === updatedUserLocationSchedule.id);
                    userLocationSchedule = userLocationSchedule.update(index, function () {
                        return updatedUserLocationSchedule;
                    });
                    this._userLocationSchedules.next(userLocationSchedule);
                    resolve(userLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule>>Observable.from(promise);
    }

    updateUserScheduleForLocation(userLocationSchedule: UserLocationSchedule, schedule: Schedule): Observable<UserLocationSchedule> {
        let promise = new Promise((resolve, reject) => {
            this._userLocationScheduleService.updateUserScheduleForLocation(userLocationSchedule, schedule)
                .subscribe((updatedUserLocationSchedule: UserLocationSchedule) => {
                    let userLocationSchedule: List<UserLocationSchedule> = this._userLocationSchedules.getValue();
                    let index = userLocationSchedule.findIndex((currentUserLocationSchedule: UserLocationSchedule) =>
                        currentUserLocationSchedule.id === updatedUserLocationSchedule.id);
                    userLocationSchedule = userLocationSchedule.update(index, function () {
                        return updatedUserLocationSchedule;
                    });
                    this._userLocationSchedules.next(userLocationSchedule);
                    resolve(userLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule>>Observable.from(promise);
    }

    associateUsersToLocation(userLocationSchedule: UserLocationSchedule[]): Observable<UserLocationSchedule[]> {
        let promise = new Promise((resolve, reject) => {
            this._userLocationScheduleService.associateUsersToLocation(userLocationSchedule)
                .subscribe((updatedDoctorLocationSchedule: UserLocationSchedule[]) => {
                    resolve(userLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule[]>>Observable.from(promise);
    }

    associateLocationsToUser(userLocationSchedule: UserLocationSchedule[]): Observable<UserLocationSchedule[]> {
        let promise = new Promise((resolve, reject) => {
            this._userLocationScheduleService.associateLocationsToUser(userLocationSchedule)
                .subscribe((updatedUserLocationSchedule: UserLocationSchedule[]) => {
                    resolve(userLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule[]>>Observable.from(promise);
    }


    deleteUserLocationSchedule(userLocationSchedule: UserLocationSchedule) {
        let userLocationSchedules = this._userLocationSchedules.getValue();
        let index = userLocationSchedules.findIndex((currentUserLocationSchedule: UserLocationSchedule) =>
            currentUserLocationSchedule.id === userLocationSchedule.id);
        let promise = new Promise((resolve, reject) => {
            this._userLocationScheduleService.deleteUserLocationSchedule(userLocationSchedule)
                .subscribe((userLocationSchedule: UserLocationSchedule) => {
                    this._userLocationSchedules.next(userLocationSchedules.delete(index));
                    resolve(userLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule>>Observable.from(promise);
    }

    deleteAppointmentsUserLocationSchedule(userLocationSchedule: UserLocationSchedule) {
        let userLocationSchedules = this._userLocationSchedules.getValue();
        let index = userLocationSchedules.findIndex((currentUserLocationSchedule: UserLocationSchedule) =>
            currentUserLocationSchedule.id === userLocationSchedule.id);
        let promise = new Promise((resolve, reject) => {
            this._userLocationScheduleService.deleteAppointmentsUserLocationSchedule(userLocationSchedule)
                .subscribe((userLocationSchedule: UserLocationSchedule) => {
                    this._userLocationSchedules.next(userLocationSchedules.delete(index));
                    resolve(userLocationSchedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<UserLocationSchedule>>Observable.from(promise);
    }


}
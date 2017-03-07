import { LocationDetails } from '../models/location-details';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Schedule } from '../models/schedule';
import { ScheduleService } from '../services/schedule-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class ScheduleStore {

    private _schedules: BehaviorSubject<List<Schedule>> = new BehaviorSubject(List([]));

    constructor(
        private _scheduleService: ScheduleService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get schedules() {
        return this._schedules.asObservable();
    }

    getSchedules(): Observable<Schedule[]> {
        let promise = new Promise((resolve, reject) => {
            this._scheduleService.getSchedules().subscribe((schedules: Schedule[]) => {
                this._schedules.next(List(schedules));
                resolve(schedules);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Schedule[]>>Observable.fromPromise(promise);
    }

       getSchedulesByCompanyId(): Observable<Schedule[]> {
           let companyId:number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._scheduleService.getSchedulesByCompanyId(companyId).subscribe((schedules: Schedule[]) => {
                this._schedules.next(List(schedules));
                resolve(schedules);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Schedule[]>>Observable.fromPromise(promise);
    }

    findScheduleById(id: number) {
        let schedules = this._schedules.getValue();
        let index = schedules.findIndex((currentSchedule: Schedule) => currentSchedule.id === id);
        return schedules.get(index);
    }

    fetchScheduleById(id: number): Observable<Schedule> {
        let promise = new Promise((resolve, reject) => {
            // let matchedSchedule: Schedule = this.findScheduleById(id);
            // if (matchedSchedule) {
            //     resolve(matchedSchedule);
            // } else {
                this._scheduleService.getSchedule(id)
                    .subscribe((schedule: Schedule) => {
                        resolve(schedule);
                    }, error => {
                        reject(error);
                    });
            // }
        });
        return <Observable<Schedule>>Observable.fromPromise(promise);
    }
    addSchedule(scheduleDetail: Schedule): Observable<Schedule> {
        let promise = new Promise((resolve, reject) => {
            this._scheduleService.addSchedule(scheduleDetail).subscribe((schedule: Schedule) => {
                this._schedules.next(this._schedules.getValue().push(schedule));
                resolve(schedule);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Schedule>>Observable.from(promise);
    }
    updateSchedule(scheduleDetail: Schedule): Observable<Schedule> {
        let promise = new Promise((resolve, reject) => {
            this._scheduleService.updateSchedule(scheduleDetail).subscribe((updatedScheduleDetail: Schedule) => {
                let scheduleDetails: List<Schedule> = this._schedules.getValue();
                let index = scheduleDetails.findIndex((currentSchedule: Schedule) => currentSchedule.id === updatedScheduleDetail.id);
                scheduleDetails = scheduleDetails.update(index, function () {
                    return updatedScheduleDetail;
                });
                this._schedules.next(scheduleDetails);
                resolve(scheduleDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Schedule>>Observable.from(promise);
    }
    deleteSchedule(schedule: Schedule) {
        let schedules = this._schedules.getValue();
        let index = schedules.findIndex((currentSchedule: Schedule) => currentSchedule.id === schedule.id);
        let promise = new Promise((resolve, reject) => {
            this._scheduleService.deleteSchedule(schedule)
                .subscribe((schedule: Schedule) => {
                    this._schedules.next(schedules.delete(index));
                    resolve(schedule);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<Schedule>>Observable.from(promise);
    }

    resetStore() {
        this._schedules.next(this._schedules.getValue().clear());
    }

}
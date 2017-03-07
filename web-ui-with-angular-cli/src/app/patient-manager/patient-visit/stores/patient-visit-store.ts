import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { PatientVisit } from '../models/patient-visit';
import { PatientVisitService } from '../services/patient-visit-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import * as _ from 'underscore';

@Injectable()
export class PatientVisitsStore {

    private _patientVisits: BehaviorSubject<List<PatientVisit>> = new BehaviorSubject(List([]));
    private _companyPatientVisits: BehaviorSubject<List<PatientVisit>> = new BehaviorSubject(List([]));

    constructor(
        private _patientVisitsService: PatientVisitService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._patientVisits.next(this._patientVisits.getValue().clear());
    }

    get patientVisit() {
        return this._patientVisits.asObservable();
    }

    getPatientVisitsByLocationId(locationId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getPatientVisitsByLocationId(locationId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByDoctorId(doctorId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getPatientVisitsByDoctorId(doctorId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByLocationAndRoomId(locationId: number, roomId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getPatientVisitsByLocationAndRoomId(locationId, roomId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByLocationAndDoctorId(locationId: number, doctorId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getPatientVisitsByLocationAndDoctorId(locationId, doctorId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }


    findPatientVisitById(id: number): PatientVisit {
        let patientVisits = this._patientVisits.getValue();
        let index = patientVisits.findIndex((currentPatientVisit: PatientVisit) => currentPatientVisit.id === id);
        return patientVisits.get(index);
    }

    fetchPatientVisitById(id: number): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            let matchedPatientVisit: PatientVisit = this.findPatientVisitById(id);
            if (matchedPatientVisit) {
                resolve(matchedPatientVisit);
            } else {
                this._patientVisitsService.getPatientVisit(id).subscribe((patientVisitDetail: PatientVisit) => {
                    resolve(patientVisitDetail);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<PatientVisit>>Observable.fromPromise(promise);
    }

    addPatientVisit(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.addPatientVisit(patientVisitDetail).subscribe((patientVisitDetail: PatientVisit) => {
                this._patientVisits.next(this._patientVisits.getValue().push(patientVisitDetail));
                resolve(patientVisitDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }

    updatePatientVisitDetail(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.updatePatientVisitDetail(patientVisitDetail).subscribe((updatedPatientVisit: PatientVisit) => {
                let patientVisitDetail: List<PatientVisit> = this._patientVisits.getValue();
                let index = patientVisitDetail.findIndex((currentPatientVisit: PatientVisit) => currentPatientVisit.id === updatedPatientVisit.id);
                patientVisitDetail = patientVisitDetail.update(index, function () {
                    return updatedPatientVisit;
                });
                this._patientVisits.next(patientVisitDetail);
                resolve(patientVisitDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }

    updatePatientVisit(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.updatePatientVisit(patientVisitDetail).subscribe((updatedPatientVisit: PatientVisit) => {
                let patientVisitDetail: List<PatientVisit> = this._patientVisits.getValue();
                let index = patientVisitDetail.findIndex((currentPatientVisit: PatientVisit) => currentPatientVisit.id === updatedPatientVisit.id);
                patientVisitDetail = patientVisitDetail.update(index, function () {
                    return updatedPatientVisit;
                });
                this._patientVisits.next(patientVisitDetail);
                resolve(patientVisitDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }

    deletePatientVisit(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let patientVisits = this._patientVisits.getValue();
        let index = patientVisits.findIndex((currentPatientVisit: PatientVisit) => currentPatientVisit.id === patientVisitDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.deletePatientVisit(patientVisitDetail).subscribe((patientVisitDetail: PatientVisit) => {
                this._patientVisits.next(patientVisits.delete(index));
                resolve(patientVisitDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }

    findPatientVisitByCalendarEventId(calendarEventId: number): PatientVisit {
        let patientVisits = this._patientVisits.getValue();
        let index = patientVisits.findIndex((currentPatientVisit: PatientVisit) => currentPatientVisit.calendarEventId === calendarEventId);
        return patientVisits.get(index);
    }

    createExceptionInRecurringEvent(patientVisit: PatientVisit): Observable<{ exceptionVisit: PatientVisit, recurringEvent: ScheduledEvent }> {
        let matchingPatientVisit: PatientVisit = this.findPatientVisitByCalendarEventId(patientVisit.calendarEvent.recurrenceId);
        let recurringEvent: ScheduledEvent = matchingPatientVisit.calendarEvent;
        let promise = this.addPatientVisit(patientVisit).toPromise()
            .then((updatedPatientVisit: PatientVisit) => {
                let updatedExceptionEvent: ScheduledEvent = updatedPatientVisit.calendarEvent;
                let recurrenceException = _.clone(recurringEvent.recurrenceException);
                recurrenceException.push(patientVisit.calendarEvent.eventStart);
                let updatedEvent: ScheduledEvent = new ScheduledEvent({
                    id: recurringEvent.id,
                    name: recurringEvent.name,
                    eventStart: recurringEvent.eventStart,
                    eventEnd: recurringEvent.eventEnd,
                    timezone: recurringEvent.timezone,
                    description: recurringEvent.description,
                    recurrenceId: recurringEvent.recurrenceId,
                    recurrenceRule: recurringEvent.recurrenceRule,
                    recurrenceException: recurrenceException,
                    isAllDay: recurringEvent.isAllDay,
                });
                return this._patientVisitsService.updateCalendarEvent(updatedEvent).toPromise()
                    .then((updatedReccurringEvent: ScheduledEvent) => {
                        return {
                            exceptionVisit: updatedPatientVisit,
                            recurringEvent: updatedReccurringEvent
                        };
                    });
            });
        return <Observable<{ exceptionVisit: PatientVisit, recurringEvent: ScheduledEvent }>>Observable.from(promise);
    }

}


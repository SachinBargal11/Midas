import { UnscheduledVisit } from '../models/unscheduled-visit';
import { EoVisit } from '../models/eo-visit';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { PatientVisit } from '../models/patient-visit';
import { VisitDocument } from '../models/visit-document';
import { PatientVisitService } from '../services/patient-visit-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import * as _ from 'underscore';
import { Consent } from '../../cases/models/consent';
import { ImeVisit } from '../models/ime-visit';


@Injectable()
export class PatientVisitsStore {

    private _patientVisits: BehaviorSubject<List<PatientVisit>> = new BehaviorSubject(List([]));
    private _companyPatientVisits: BehaviorSubject<List<PatientVisit>> = new BehaviorSubject(List([]));
    private _consent: BehaviorSubject<List<Consent>> = new BehaviorSubject(List([]));
    private _imeVisits: BehaviorSubject<List<ImeVisit>> = new BehaviorSubject(List([]));
    private _eoVisits: BehaviorSubject<List<EoVisit>> = new BehaviorSubject(List([]));
    private _unscheduledVisits: BehaviorSubject<List<UnscheduledVisit>> = new BehaviorSubject(List([]));

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

    get imeVisit() {
        return this._imeVisits.asObservable();
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

    getPatientVisitsByCaseId(caseId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getPatientVisitsByCaseId(caseId).subscribe((patientVisits: PatientVisit[]) => {
                // this._patientVisits.next(List(patientVisits));
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

    getPatientVisitsByLocationDoctorAndRoomId(locationId: number, doctorId: number, roomId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getPatientVisitsByLocationDoctorAndRoomId(locationId, doctorId, roomId).subscribe((patientVisits: PatientVisit[]) => {
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

    getPatientVisitsByLocationDoctorAndCompanyId(locationId: number, doctorId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getPatientVisitsByLocationDoctorAndCompanyId(locationId, doctorId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByLocationDoctorAndSpecialityId(locationId: number, doctorId: number, specialityId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getPatientVisitsByLocationDoctorAndSpecialityId(locationId, doctorId, specialityId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }


    getDocumentsForVisitId(visitId: number): Observable<VisitDocument[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getDocumentsForVisitId(visitId).subscribe((documents: VisitDocument[]) => {
                resolve(documents);
            }, error => {
                reject(error);
            });
        });
        return <Observable<VisitDocument[]>>Observable.fromPromise(promise);
    }

    getDocumentsForImeVisitId(visitId: number): Observable<VisitDocument[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getDocumentsForImeVisitId(visitId).subscribe((documents: VisitDocument[]) => {
                resolve(documents);
            }, error => {
                reject(error);
            });
        });
        return <Observable<VisitDocument[]>>Observable.fromPromise(promise);
    }

    getDocumentsForEoVisitId(visitId: number): Observable<VisitDocument[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getDocumentsForEoVisitId(visitId).subscribe((documents: VisitDocument[]) => {
                resolve(documents);
            }, error => {
                reject(error);
            });
        });
        return <Observable<VisitDocument[]>>Observable.fromPromise(promise);
    }

    getDocumentsForUnscheduledVisitId(visitId: number): Observable<VisitDocument[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getDocumentsForUnscheduledVisitId(visitId).subscribe((documents: VisitDocument[]) => {
                resolve(documents);
            }, error => {
                reject(error);
            });
        });
        return <Observable<VisitDocument[]>>Observable.fromPromise(promise);
    }

    getVisitsByDatesAndDoctorId(starDate: any, endDate: any, doctorId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getVisitsByDatesAndDoctorId(starDate, endDate, doctorId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getVisitsByDoctorAndDates(starDate: any, endDate: any, doctorId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getVisitsByDoctorAndDates(starDate, endDate, doctorId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getVisitsByDoctorDatesAndName(starDate: any, endDate: any, doctorName: string): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getVisitsByDoctorDatesAndName(starDate, endDate, doctorName).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    uploadDocument(DocumentsDetail: VisitDocument, currentVisitId: number): Observable<VisitDocument> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.uploadDocumentForVisit(DocumentsDetail, currentVisitId).subscribe((DocumentsDetail: VisitDocument) => {
                // this._patientVisits.next(this._patientVisits.getValue().push(DocumentsDetail));
                resolve(DocumentsDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<VisitDocument>>Observable.from(promise);
    }

    findPatientVisitById(id: number): PatientVisit {
        let patientVisits = this._patientVisits.getValue();
        let index = patientVisits.findIndex((currentPatientVisit: PatientVisit) => currentPatientVisit.id === id);
        return patientVisits.get(index);
    }

    fetchPatientVisitById(id: number): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            // let matchedPatientVisit: PatientVisit = this.findPatientVisitById(id);
            // if (matchedPatientVisit) {
            //     resolve(matchedPatientVisit);
            // } else {
            this._patientVisitsService.getPatientVisit(id).subscribe((patientVisitDetail: PatientVisit) => {
                resolve(patientVisitDetail);
            }, error => {
                reject(error);
            });
            // }
        });
        return <Observable<PatientVisit>>Observable.fromPromise(promise);
    }

    fetchImeVisitById(id: number): Observable<ImeVisit> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getImeVisit(id).subscribe((imeVisitDetail: ImeVisit) => {
                resolve(imeVisitDetail);
            }, error => {
                reject(error);
            });
            // }
        });
        return <Observable<ImeVisit>>Observable.fromPromise(promise);
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

    updatePatientVisitDetail(patientVisit: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.updatePatientVisitDetail(patientVisit).subscribe((updatedPatientVisit: PatientVisit) => {
                let patientVisitDetail: List<PatientVisit> = this._patientVisits.getValue();
                let index = patientVisitDetail.findIndex((currentPatientVisit: PatientVisit) => currentPatientVisit.id === updatedPatientVisit.id);
                patientVisitDetail = patientVisitDetail.update(index, function () {
                    return updatedPatientVisit;
                });
                this._patientVisits.next(patientVisitDetail);
                resolve(updatedPatientVisit);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }

    updateEoVisitDetail(eoVisit: EoVisit): Observable<EoVisit> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.updateEoVisitDetail(eoVisit).subscribe((updatedPatientVisit: EoVisit) => {
                let eoVisitDetail: List<EoVisit> = this._eoVisits.getValue();
                let index = eoVisitDetail.findIndex((currentPatientVisit: EoVisit) => currentPatientVisit.id === updatedPatientVisit.id);
                eoVisitDetail = eoVisitDetail.update(index, function () {
                    return updatedPatientVisit;
                });
                this._eoVisits.next(eoVisitDetail);
                resolve(updatedPatientVisit);
            }, error => {
                reject(error);
            });
        });
        return <Observable<EoVisit>>Observable.from(promise);
    }

    updateImeVisitDetail(imeVisit: ImeVisit): Observable<ImeVisit> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.updateImeVisitDetail(imeVisit).subscribe((updatedPatientVisit: ImeVisit) => {
                let imeVisitDetail: List<ImeVisit> = this._imeVisits.getValue();
                let index = imeVisitDetail.findIndex((currentPatientVisit: ImeVisit) => currentPatientVisit.id === updatedPatientVisit.id);
                imeVisitDetail = imeVisitDetail.update(index, function () {
                    return updatedPatientVisit;
                });
                this._imeVisits.next(imeVisitDetail);
                resolve(updatedPatientVisit);
            }, error => {
                reject(error);
            });
        });
        return <Observable<ImeVisit>>Observable.from(promise);
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
                resolve(updatedPatientVisit);
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

    deleteImeVisit(imeVisitDetail: ImeVisit): Observable<ImeVisit> {
        let imeVisit = this._imeVisits.getValue();
        let index = imeVisit.findIndex((currentImeVisit: ImeVisit) => currentImeVisit.id === imeVisitDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.deleteImeVisit(imeVisitDetail).subscribe((imeVisitDetail: ImeVisit) => {
                this._imeVisits.next(imeVisit.delete(index));
                resolve(imeVisitDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<ImeVisit>>Observable.from(promise);
    }

    deleteEuoVisit(euoVisitDetail: EoVisit): Observable<EoVisit> {
        let euoVisit = this._eoVisits.getValue();
        let index = euoVisit.findIndex((currentEuoVisit: EoVisit) => currentEuoVisit.id === euoVisitDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.deleteEuoVisit(euoVisitDetail).subscribe((euoVisitDetail: EoVisit) => {
                // this._eoVisits.next(euoVisitDetail.delete(index));
                resolve(euoVisitDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<EoVisit>>Observable.from(promise);
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
                recurrenceException.push(updatedPatientVisit.calendarEvent.eventStart);
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

    cancelPatientVisit(patientVisit: PatientVisit): Observable<PatientVisit> {
        let promise = this.createExceptionInRecurringEvent(patientVisit).toPromise()
            .then((result: { exceptionVisit: PatientVisit, recurringEvent: ScheduledEvent }) => {
                return this._patientVisitsService.cancelPatientVisit(result.exceptionVisit).toPromise()
                    .then((cancelledPatientVisit: PatientVisit) => {
                        let patientVisitDetail: List<PatientVisit> = this._patientVisits.getValue();
                        let index = patientVisitDetail.findIndex((currentPatientVisit: PatientVisit) => currentPatientVisit.id === cancelledPatientVisit.id);
                        patientVisitDetail = patientVisitDetail.update(index, function () {
                            return cancelledPatientVisit;
                        });
                        this._patientVisits.next(patientVisitDetail);
                        return cancelledPatientVisit;
                    });
            });
        return <Observable<PatientVisit>>Observable.from(promise);
    }

    cancelCurrentOccurrenceVisit(patientVisit: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.cancelCurrentOccurrenceVisit(patientVisit)
                .subscribe((updatedPatientVisit: PatientVisit) => {
                    let patientVisits: List<PatientVisit> = this._patientVisits.getValue();
                    let index = patientVisits.findIndex((currentPatientVisit: PatientVisit) => currentPatientVisit.id === patientVisit.id);
                    patientVisits = patientVisits.update(index, () => {
                        return updatedPatientVisit;
                    });
                    this._patientVisits.next(patientVisits);
                    resolve(updatedPatientVisit);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }

    updateCalendarEvent(patientVisit: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.updateCalendarEvent(patientVisit.calendarEvent)
                .subscribe((updatedCalendarEvent: ScheduledEvent) => {
                    let patientVisits: List<PatientVisit> = this._patientVisits.getValue();
                    let index = patientVisits.findIndex((currentPatientVisit: PatientVisit) => currentPatientVisit.id === patientVisit.id);
                    let updatedPatientVisit: PatientVisit = <PatientVisit>patientVisit.set('calendarEvent', updatedCalendarEvent);
                    patientVisits = patientVisits.update(index, () => {
                        return updatedPatientVisit;
                    });
                    this._patientVisits.next(patientVisits);
                    resolve(updatedPatientVisit);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }

    cancelCalendarEvent(patientVisit: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.cancelPatientVisit(patientVisit)
                .subscribe((updatedPatientVisit: PatientVisit) => {
                    let patientVisits: List<PatientVisit> = this._patientVisits.getValue();
                    let index = patientVisits.findIndex((currentPatientVisit: PatientVisit) => currentPatientVisit.id === patientVisit.id);
                    patientVisits = patientVisits.update(index, () => {
                        return updatedPatientVisit;
                    });
                    this._patientVisits.next(patientVisits);
                    resolve(updatedPatientVisit);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }

    deleteDocument(caseDocument: VisitDocument): Observable<PatientVisit> {
        let cases = this._patientVisits.getValue();
        let index = cases.findIndex((currentCase: PatientVisit) => currentCase.id === caseDocument.visitId);
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.deleteDocument(caseDocument).subscribe((caseDetail: PatientVisit) => {
                this._patientVisits.next(cases.delete(index));
                resolve(caseDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }

    deleteVisitDocument(visitId: number, documentId: number): Observable<PatientVisit> {        
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.deleteVisitDocument(visitId, documentId).subscribe((caseDetail: PatientVisit) => {                
                resolve(caseDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }

    downloadDocumentForm(visitId: Number, documentId: Number): Observable<Consent[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.downloadDocumentForm(visitId, documentId).subscribe((consent: Consent[]) => {
                this._consent.next(List(consent));
                resolve(consent);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }

    addImeVisit(imeVisitDetail: any): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.addImeVisit(imeVisitDetail).subscribe((imeVisitDetail: any) => {
                this._imeVisits.next(this._imeVisits.getValue().push(imeVisitDetail));
                resolve(imeVisitDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.from(promise);
    }

    addUnscheduledVisit(unscheduledVisitDetail: any): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.addUnscheduledVisit(unscheduledVisitDetail).subscribe((unscheduledVisitDetail: any) => {
                this._unscheduledVisits.next(this._unscheduledVisits.getValue().push(unscheduledVisitDetail));
                resolve(unscheduledVisitDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.from(promise);
    }

    getUnscheduledVisitsByCaseId(caseId: number): Observable<UnscheduledVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getUnscheduledVisitsByCaseId(caseId).subscribe((unscheduledVisit: UnscheduledVisit[]) => {
                // this._patientVisits.next(List(patientVisits));
                resolve(unscheduledVisit);
            }, error => {
                reject(error);
            });
        });
        return <Observable<UnscheduledVisit[]>>Observable.fromPromise(promise);
    }

    getUnscheduledVisitDetailById(id: number): Observable<UnscheduledVisit> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getUnscheduledVisitDetailById(id).subscribe((unscheduledVisit: UnscheduledVisit) => {
                // this._patientVisits.next(List(patientVisits));
                resolve(unscheduledVisit);
            }, error => {
                reject(error);
            });
        });
        return <Observable<UnscheduledVisit>>Observable.fromPromise(promise);
    }

    updateUnscheduledVisitDetail(unscheduledVisit: UnscheduledVisit): Observable<UnscheduledVisit> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.updateUnscheduledVisitDetail(unscheduledVisit).subscribe((updatedPatientVisit: UnscheduledVisit) => {
                let unscheduledVisitDetail: List<UnscheduledVisit> = this._unscheduledVisits.getValue();
                let index = unscheduledVisitDetail.findIndex((currentPatientVisit: UnscheduledVisit) => currentPatientVisit.id === updatedPatientVisit.id);
                unscheduledVisitDetail = unscheduledVisitDetail.update(index, function () {
                    return updatedPatientVisit;
                });
                this._unscheduledVisits.next(unscheduledVisitDetail);
                resolve(updatedPatientVisit);
            }, error => {
                reject(error);
            });
        });
        return <Observable<UnscheduledVisit>>Observable.from(promise);
    }

    getPatientVisitsByCompanyId(companyId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getPatientVisitsByCompanyId().subscribe((patientVisits: PatientVisit[]) => {
                // this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByCompanyIdDoctorId(): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getPatientVisitsByCompanyDoctorId().subscribe((patientVisits: PatientVisit[]) => {
                // this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }
    

    getImeVisitByCompanyId(companyId: number): Observable<ImeVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getImeVisitByCompanyId().subscribe((imeVisits: ImeVisit[]) => {
                // this._imeVisits.next(List(imeVisits));
                resolve(imeVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<ImeVisit[]>>Observable.fromPromise(promise);
    }

    getImeVisitByCaseId(caseId: number): Observable<ImeVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getImeVisitByCaseId(caseId).subscribe((imeVisits: ImeVisit[]) => {
                // this._imeVisits.next(List(imeVisits));
                resolve(imeVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<ImeVisit[]>>Observable.fromPromise(promise);
    }

    addEoVisit(eoVisitDetail: any): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.addEoVisit(eoVisitDetail).subscribe((eoVisitDetail: any) => {
                this._eoVisits.next(this._eoVisits.getValue().push(eoVisitDetail));
                resolve(eoVisitDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.from(promise);
    }

    getEoVisitByCompanyId(companyId: number): Observable<EoVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getEoVisitByCompanyId().subscribe((eoVisits: EoVisit[]) => {
                // this._eoVisits.next(List(eoVisits));
                resolve(eoVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<EoVisit[]>>Observable.fromPromise(promise);
    }

    getEoVisitByCompanyAndDoctorId(companyId: number, doctorId: number): Observable<EoVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getEoVisitByCompanyAndDoctorId(doctorId).subscribe((eoVisits: EoVisit[]) => {
                // this._eoVisits.next(List(eoVisits));
                resolve(eoVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<EoVisit[]>>Observable.fromPromise(promise);
    }

    //------------------------------------------------------- Dashboard APIs --------------------------------------------------------//
    getPatientVisitForDateByLocationId(date: any, locationId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getPatientVisitForDateByLocationId(date, locationId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }
    getDoctorPatientVisitForDateByLocationId(date: any, doctorId: number, locationId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getDoctorPatientVisitForDateByLocationId(date, doctorId, locationId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }
    getPatientVisitForDateByCompanyId(date: any, companyId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getPatientVisitForDateByCompanyId(date, companyId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }
    getDoctorPatientVisitForDateByCompanyId(date: any, doctorId: number, companyId: number): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getDoctorPatientVisitForDateByCompanyId(date, doctorId, companyId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }
    getOpenAppointmentSlotsForDoctorByCompanyId(date: any, doctorId: number): Observable<PatientVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getOpenAppointmentSlotsForDoctorByCompanyId(date, doctorId, companyId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getOpenAppointmentSlotsForCompanyId(date: any): Observable<PatientVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getOpenAppointmentSlotsForCompanyId(date, companyId).subscribe((patientVisits: PatientVisit[]) => {
                this._patientVisits.next(List(patientVisits));
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getStatisticalDataOnPatientVisit(fromDate: any, toDate: any): Observable<any> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getStatisticalDataOnPatientVisit(fromDate, toDate, companyId).subscribe((patientVisits: any) => {
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    getStatisticalDataOnCaseByCaseType(fromDate: any, toDate: any,caseType:number): Observable<any> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getStatisticalDataOnCaseByCaseType(fromDate, toDate, companyId,caseType).subscribe((patientVisits: any) => {
                resolve(patientVisits);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    getStatisticalDataOnCaseByInsuranceProvider(fromDate: any, toDate: any,caseType:number): Observable<any> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getStatisticalDataOnCaseByInsuranceProvider(fromDate, toDate, companyId,caseType).subscribe((data: any) => {
                resolve(data);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }


    getVisitStatusbyPatientVisitIdSpecialityId(patientVisitId: number, specialityId: number ): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getVisitStatusbyPatientVisitIdSpecialityId(patientVisitId, specialityId).subscribe((patientVisitDetails: PatientVisit[]) => {
                //.next(List(patientVisitDetails));
                resolve(patientVisitDetails);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.from(promise);
    }

    getVisitStatusbyPatientVisitIdRoomTestId(patientVisitId: number, roomTestId: number ): Observable<PatientVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientVisitsService.getVisitStatusbyPatientVisitIdRoomTestId(patientVisitId, roomTestId).subscribe((patientVisitDetails: PatientVisit[]) => {
                //.next(List(patientVisitDetails));
                resolve(patientVisitDetails);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PatientVisit[]>>Observable.from(promise);
    }
}
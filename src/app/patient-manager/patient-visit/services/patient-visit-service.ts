import { UnscheduledVisitAdapter } from './adapters/unscheduled-visit-adapter';
import { UnscheduledVisit } from '../models/unscheduled-visit';
import { Procedure } from '../../../commons/models/procedure';
import { ScheduledEventAdapter } from '../../../medical-provider/locations/services/adapters/scheduled-event-adapter';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { PatientVisit } from '../models/patient-visit';
import { VisitDocument } from '../models/visit-document';
import { SessionStore } from '../../../commons/stores/session-store';
import { PatientVisitAdapter } from './adapters/patient-visit-adapter';
import { VisitDocumentAdapter } from './adapters/visit-document-adapter';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Consent } from '../../cases/models/consent';
import { ImeVisit } from '../models/ime-visit';
import { EoVisit } from '../models/eo-visit';
import { ImeVisitAdapter } from './adapters/ime-visit-adapter';
import { EoVisitAdapter } from './adapters/eo-visit-adapter';

@Injectable()
export class PatientVisitService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getPatientVisit(patientVisitId: Number): Observable<PatientVisit> {
        let promise: Promise<PatientVisit> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/get/' + patientVisitId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let patientVisits = null;
                    if (data) {
                        patientVisits = PatientVisitAdapter.parseResponse(data);
                        resolve(patientVisits);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit>>Observable.fromPromise(promise);
    }

    getImeVisit(imeVisitId: Number): Observable<ImeVisit> {
        let promise: Promise<ImeVisit> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/IMEVisit/get/' + imeVisitId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let imeVisits = null;
                    if (data) {
                        imeVisits = ImeVisitAdapter.parseResponse(data);
                        resolve(imeVisits);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<ImeVisit>>Observable.fromPromise(promise);
    }

    getPatientVisitsByLocationId(locationId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/getByLocationId/' + locationId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByCaseId(caseId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/getByCaseId/' + caseId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {                        
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getUnscheduledVisitsByCaseId(caseId: number): Observable<UnscheduledVisit[]> {
        let promise: Promise<UnscheduledVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/patientVisitUnscheduled/getByCaseId/' + caseId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let unscheduledVisit = (<Object[]>data).map((data: any) => {
                        return UnscheduledVisitAdapter.parseResponse(data);
                    });
                    resolve(unscheduledVisit);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<UnscheduledVisit[]>>Observable.fromPromise(promise);
    }

    getVisitsByDatesAndDoctorId(starDate: any, endDate: any, doctorId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            let fromDate = starDate.format('YYYY-MM-DD');
            let toDate = endDate.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/patientVisit/getByDates/' + doctorId + '/' + fromDate + '/' + toDate, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getVisitsByDoctorAndDates(starDate: any, endDate: any, doctorId: number): Observable<PatientVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            let fromDate = starDate.format('YYYY-MM-DD');
            let toDate = endDate.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/patientVisit/getByDoctorAndDates/' + doctorId + '/' + companyId + '/' + fromDate + '/' + toDate, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getVisitsByDoctorDatesAndName(starDate: any, endDate: any, doctorName: string): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            let fromDate = starDate.format('YYYY-MM-DD');
            let toDate = endDate.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/patientVisit/getByDoctorDatesAndName/' + fromDate + '/' + toDate + '/' + doctorName, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getDocumentsForVisitId(visitId: number): Observable<VisitDocument[]> {
        let promise: Promise<VisitDocument[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/documentmanager/get/' + visitId + '/visit', {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let document = (<Object[]>data).map((data: any) => {
                        debugger;
                        return VisitDocumentAdapter.parseResponse(data);
                    });
                    resolve(document);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<VisitDocument[]>>Observable.fromPromise(promise);
    }

    getDocumentsForImeVisitId(visitId: number): Observable<VisitDocument[]> {
        let promise: Promise<VisitDocument[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/documentmanager/get/' + visitId + '/imeVisit', {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let document = (<Object[]>data).map((data: any) => {
                        return VisitDocumentAdapter.parseResponse(data);
                    });
                    resolve(document);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<VisitDocument[]>>Observable.fromPromise(promise);
    }

    getDocumentsForEoVisitId(visitId: number): Observable<VisitDocument[]> {
        let promise: Promise<VisitDocument[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/documentmanager/get/' + visitId + '/euoVisit', {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let document = (<Object[]>data).map((data: any) => {
                        return VisitDocumentAdapter.parseResponse(data);
                    });
                    resolve(document);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<VisitDocument[]>>Observable.fromPromise(promise);
    }

    getDocumentsForUnscheduledVisitId(visitId: number): Observable<VisitDocument[]> {
        let promise: Promise<VisitDocument[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/documentmanager/get/' + visitId + '/unscheduleVisit', {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let document = (<Object[]>data).map((data: any) => {
                        return VisitDocumentAdapter.parseResponse(data);
                    });
                    resolve(document);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<VisitDocument[]>>Observable.fromPromise(promise);
    }

    uploadDocumentForVisit(VisitDocument: VisitDocument, currentVisitId: number): Observable<VisitDocument> {
        let promise: Promise<VisitDocument> = new Promise((resolve, reject) => {
            let requestData = _.extend(VisitDocument.toJS());
            // requestData = _.omit(requestData, 'caseId');
            return this._http.post(environment.SERVICE_BASE_URL + '/fileupload/upload/' + currentVisitId + '/visit', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedVisitDocuments: VisitDocument = null;
                    parsedVisitDocuments = VisitDocumentAdapter.parseResponse(data);
                    resolve(parsedVisitDocuments);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<VisitDocument>>Observable.fromPromise(promise);
    }


    getPatientVisitsByDoctorId(doctorId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/getByDoctorId/' + doctorId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByLocationAndRoomId(locationId: number, roomId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/getByLocationAndRoomId/' + locationId + '/' + roomId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByLocationDoctorAndRoomId(locationId: number, doctorId: number, roomId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/getByLocationDoctorAndRoomId/' + locationId + '/' + doctorId + '/' + roomId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByLocationAndDoctorId(locationId: number, doctorId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/getByLocationAndDoctorId/' + locationId + '/' + doctorId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByLocationDoctorAndCompanyId(locationId: number, doctorId: number): Observable<PatientVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/getByLocationDoctorAndCompanyId/' + locationId + '/' + doctorId + '/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByLocationDoctorAndSpecialityId(locationId: number, doctorId: number, specialtyId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/getByLocationDoctorAndSpecialityId/' + locationId + '/' + doctorId + '/' + specialtyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    addPatientVisit(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let promise: Promise<PatientVisit> = new Promise((resolve, reject) => {
            let requestData = _.extend(patientVisitDetail.toJS(), {
                calendarEvent: _.extend(patientVisitDetail.calendarEvent.toJS(), {
                    recurrenceRule: patientVisitDetail.calendarEvent.recurrenceRule
                        ? patientVisitDetail.calendarEvent.recurrenceRule.toString()
                        : '',
                    recurrenceException: ''
                })
            });
            requestData.createByUserID = this._sessionStore.session.account.user.id;
            requestData.addedByCompanyId = this._sessionStore.session.currentCompany.id;
            // requestData.calendarEvent = _.omit(requestData.calendarEvent, 'transportProviderId');
            requestData = _.omit(requestData, 'caseId');
            return this._http.post(environment.SERVICE_BASE_URL + '/PatientVisit/Save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedPatientVisit: PatientVisit = null;
                    parsedPatientVisit = PatientVisitAdapter.parseResponse(data);
                    resolve(parsedPatientVisit);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.fromPromise(promise);
    }

    updateCalendarEvent(scheduledEvent: ScheduledEvent): Observable<ScheduledEvent> {
        let promise = new Promise((resolve, reject) => {
            let requestData = {
                calendarEvent: _.extend(scheduledEvent.toJS(), {
                    recurrenceRule: scheduledEvent.recurrenceRule
                        ? scheduledEvent.recurrenceRule.toString()
                        : '',
                    recurrenceException: _.map(scheduledEvent.recurrenceException, (datum: moment.Moment) => {
                        return `${datum.format('YYYYMMDD')}T${datum.format('hhmmss')}Z`;
                    }).join(',')
                })
            };
            // requestData.calendarEvent = _.omit(requestData.calendarEvent, 'transportProviderId');
            return this._http.post(environment.SERVICE_BASE_URL + '/PatientVisit/Save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedPatientVisit: PatientVisit = null;
                    parsedPatientVisit = PatientVisitAdapter.parseResponse(data);
                    resolve(parsedPatientVisit);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ScheduledEvent>>Observable.fromPromise(promise);
    }

    updatePatientVisit(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            let requestData = _.extend(patientVisitDetail.toJS(), {
                calendarEvent: _.extend(patientVisitDetail.calendarEvent.toJS(), {
                    recurrenceRule: patientVisitDetail.calendarEvent.recurrenceRule
                        ? patientVisitDetail.calendarEvent.recurrenceRule.toString()
                        : '',
                    recurrenceException: _.map(patientVisitDetail.calendarEvent.recurrenceException, (datum: moment.Moment) => {
                        return datum.format('YYYYMMDDThhmmss') + 'Z';
                    }).join(',')
                })
            });
            // requestData.calendarEvent = _.omit(requestData.calendarEvent, 'transportProviderId');
            requestData = _.omit(requestData, 'caseId');
            requestData.addedByCompanyId = this._sessionStore.session.currentCompany.id;
            return this._http.post(environment.SERVICE_BASE_URL + '/PatientVisit/Save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedPatientVisit: PatientVisit = null;
                    parsedPatientVisit = PatientVisitAdapter.parseResponse(data);
                    resolve(parsedPatientVisit);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.fromPromise(promise);

    }

    cancelPatientVisit(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/CancleCalendarEvent/' + patientVisitDetail.calendarEvent.id, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCalendarEvent: ScheduledEvent = null;
                    parsedCalendarEvent = ScheduledEventAdapter.parseResponse(data);
                    let updatedPatientVisitDetail: PatientVisit = <PatientVisit>patientVisitDetail.set('calendarEvent', parsedCalendarEvent);
                    resolve(updatedPatientVisitDetail);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.fromPromise(promise);
    }

    // cancelCurrentOccurrenceVisit(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
    //     let promise = new Promise((resolve, reject) => {
    //         return this._http.get(environment.SERVICE_BASE_URL + '/patientVisit/cancelSingleEventOccurrence/' + patientVisitDetail.calendarEvent.id , {
    //             headers: this._headers
    //         })
    //             .map(res => res.json())
    //             .subscribe((data: any) => {
    //                 let parsedCalendarEvent: ScheduledEvent = null;
    //                 parsedCalendarEvent = ScheduledEventAdapter.parseResponse(data);
    //                 let updatedPatientVisitDetail: PatientVisit = <PatientVisit>patientVisitDetail.set('calendarEvent', parsedCalendarEvent);
    //                 resolve(updatedPatientVisitDetail);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<PatientVisit>>Observable.fromPromise(promise);
    // }

    cancelCurrentOccurrenceVisit(patientVisit: PatientVisit): Observable<PatientVisit> {
        let startDate = patientVisit.calendarEvent.eventStart.utc();
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/patientVisit/cancelSingleEventOccurrence/' + patientVisit.id + '/' + startDate.format('YYYY-MM-DD'), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCalendarEvent: ScheduledEvent = null;
                    parsedCalendarEvent = ScheduledEventAdapter.parseResponse(data);
                    let updatedPatientVisitDetail: PatientVisit = <PatientVisit>patientVisit.set('calendarEvent', parsedCalendarEvent);
                    resolve(updatedPatientVisitDetail);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.fromPromise(promise);
    }


    updatePatientVisitDetail(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            let requestData = patientVisitDetail.toJS();
            let procedures = _.map(requestData.patientVisitProcedureCodes, (currentProcedure: Procedure) => {
                return { 'procedureCodeId': currentProcedure.procedureCodeId,'procedureAmount': currentProcedure.procedureAmount,'procedureUnit': currentProcedure.procedureUnit,'procedureTotalAmount':currentProcedure.procedureTotalAmount };
            })
            requestData.patientVisitProcedureCodes = procedures;
            requestData.addedByCompanyId = this._sessionStore.session.currentCompany.id;
            requestData = _.omit(requestData, 'calendarEvent');
            return this._http.post(environment.SERVICE_BASE_URL + '/PatientVisit/Save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedPatientVisit: PatientVisit = null;
                    parsedPatientVisit = PatientVisitAdapter.parseResponse(data);
                    resolve(parsedPatientVisit);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.fromPromise(promise);
    }

    updateEoVisitDetail(eoVisitDetail: EoVisit): Observable<EoVisit> {
        let promise = new Promise((resolve, reject) => {
            let requestData = eoVisitDetail.toJS();
            let procedures = _.map(requestData.patientVisitProcedureCodes, (currentProcedure: Procedure) => {
                return { 'procedureCodeId': currentProcedure.id };
            })
            requestData.patientVisitProcedureCodes = procedures;
            requestData.addedByCompanyId = this._sessionStore.session.currentCompany.id;
            requestData = _.omit(requestData, 'calendarEvent');
            return this._http.post(environment.SERVICE_BASE_URL + '/EOvisit/SaveEOVisit', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedEoVisit: EoVisit = null;
                    parsedEoVisit = EoVisitAdapter.parseResponse(data);
                    resolve(parsedEoVisit);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<EoVisit>>Observable.fromPromise(promise);
    }

    updateImeVisitDetail(imeVisitDetail: ImeVisit): Observable<ImeVisit> {
        let promise = new Promise((resolve, reject) => {
            let requestData = imeVisitDetail.toJS();
            let procedures = _.map(requestData.patientVisitProcedureCodes, (currentProcedure: Procedure) => {
                return { 'procedureCodeId': currentProcedure.id };
            })
            requestData.patientVisitProcedureCodes = procedures;
            requestData.addedByCompanyId = this._sessionStore.session.currentCompany.id;
            requestData.VisitCreatedByCompanyId = this._sessionStore.session.currentCompany.id;
            requestData = _.omit(requestData, 'calendarEvent');
            return this._http.post(environment.SERVICE_BASE_URL + '/IMEvisit/SaveIMEVisit', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    let parsedImeVisit: ImeVisit = null;
                    parsedImeVisit = ImeVisitAdapter.parseResponse(data);
                    resolve(parsedImeVisit);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ImeVisit>>Observable.fromPromise(promise);
    }

    deletePatientVisit(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/DeleteVisit/' + patientVisitDetail.id, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.fromPromise(promise);
    }

    deleteImeVisit(imeVisitDetail: ImeVisit): Observable<ImeVisit> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/IMEVisit/delete/' + imeVisitDetail.id, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ImeVisit>>Observable.fromPromise(promise);
    }

    deleteEuoVisit(euoVisitDetail: EoVisit): Observable<EoVisit> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/EOVisit/delete/' + euoVisitDetail.id, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<EoVisit>>Observable.fromPromise(promise);
    }

    deleteDocument(caseDocument: VisitDocument): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/fileupload/delete/' + caseDocument.visitId + '/' + caseDocument.document.documentId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCaseDocument: VisitDocument = null;
                    parsedCaseDocument = VisitDocumentAdapter.parseResponse(data);
                    resolve(parsedCaseDocument);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }

    deleteVisitDocument(visitId:number, documentId:number ): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/fileupload/delete/' + visitId + '/' + documentId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let parsedCaseDocument: VisitDocument = null;
                    parsedCaseDocument = VisitDocumentAdapter.parseResponse(data);
                    resolve(parsedCaseDocument);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit>>Observable.from(promise);
    }


    downloadDocumentForm(visitId: Number, documentId: Number): Observable<Consent[]> {
        let thefile = {};
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<Consent[]> = new Promise((resolve, reject) => {
            this._http
                .get(environment.SERVICE_BASE_URL + '/documentmanager/downloadfromblob/' + companyId + '/' + documentId, {
                    headers: this._headers
                })
                .map(res => {
                    // If request fails, throw an Error that will be caught
                    if (res.status < 200 || res.status == 500 || res.status == 404) {
                        throw new Error('This request has failed ' + res.status);
                    }
                    // If everything went fine, return the response
                    else {
                        window.location.assign(environment.SERVICE_BASE_URL + '/documentmanager/downloadfromblob/' + companyId + '/' + documentId);
                        // return res.arrayBuffer();
                    }
                })
                .subscribe(data => thefile = new Blob([data], { type: "application/octet-stream" }),
                (error) => {
                    reject(error);
                    console.log("Error downloading the file.")

                },
                () => console.log('Completed file download.'));
            //window.location.assign(environment.SERVICE_BASE_URL + '/fileupload/download/' + CaseId + '/' + documentId);
        });
        return <Observable<Consent[]>>Observable.fromPromise(promise);
    }

    addImeVisit(requestData: any): Observable<ImeVisit> {
        let promise: Promise<ImeVisit> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(environment.SERVICE_BASE_URL + '/IMEvisit/SaveIMEVisit', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ImeVisit>>Observable.fromPromise(promise);
    }

    addUnscheduledVisit(requestData: any): Observable<UnscheduledVisit> {
        let promise: Promise<UnscheduledVisit> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(environment.SERVICE_BASE_URL + '/patientVisitUnscheduled/Save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<UnscheduledVisit>>Observable.fromPromise(promise);
    }

    updateUnscheduledVisitDetail(requestData: any): Observable<UnscheduledVisit> {
        let promise: Promise<UnscheduledVisit> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(environment.SERVICE_BASE_URL + '/patientVisitUnscheduled/Save', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<UnscheduledVisit>>Observable.fromPromise(promise);
    }

    // updateUnscheduledVisitDetail(requestData: UnscheduledVisit): Observable<UnscheduledVisit> {
    //     let promise: Promise<UnscheduledVisit> = new Promise((resolve, reject) => {
    //        // let requestData = unscheduledVisitDetail.toJS();
    //        let headers = new Headers();
    //         headers.append('Content-Type', 'application/json');          
    //         //requestData = _.omit(requestData, 'calendarEvent');
    //         return this._http.post(environment.SERVICE_BASE_URL + '/patientVisitUnscheduled/Save', JSON.stringify(requestData), {
    //             headers: this._headers
    //         })
    //             .map(res => res.json())
    //             .subscribe((data: any) => {
    //                 let parsedUnscheduledVisit: UnscheduledVisit = null;
    //                 parsedUnscheduledVisit = UnscheduledVisitAdapter.parseResponse(data);
    //                 resolve(parsedUnscheduledVisit);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<UnscheduledVisit>>Observable.fromPromise(promise);
    // }

    getUnscheduledVisitDetailById(patientVisitId: Number): Observable<UnscheduledVisit> {
        let promise: Promise<UnscheduledVisit> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/patientVisitUnscheduled/get/' + patientVisitId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let unscheduledVisits = null;
                    if (data) {
                        unscheduledVisits = UnscheduledVisitAdapter.parseResponse(data);
                        resolve(unscheduledVisits);
                    } else {
                        reject(new Error('NOT_FOUND'));
                    }
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<UnscheduledVisit>>Observable.fromPromise(promise);
    }

    getPatientVisitsByCompanyId(): Observable<PatientVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientVisit/getByCompanyId/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getPatientVisitsByCompanyDoctorId(): Observable<PatientVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let doctorId = this._sessionStore.session.user.id;
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientVisit/getByCompanyAndDoctorId/' + companyId  + '/' + doctorId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }

    getImeVisitByCompanyId(): Observable<ImeVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<ImeVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/IMEVisit/getByCompanyId/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let imeVisits = (<Object[]>data).map((data: any) => {
                        return ImeVisitAdapter.parseResponse(data);
                    });
                    resolve(imeVisits);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ImeVisit[]>>Observable.fromPromise(promise);
    }


    getImeVisitByCaseId(caseId:number): Observable<ImeVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<ImeVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/IMEVisit/getByCaseId/' + caseId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let imeVisits = (<Object[]>data).map((data: any) => {
                        return ImeVisitAdapter.parseResponse(data);
                    });
                    resolve(imeVisits);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<ImeVisit[]>>Observable.fromPromise(promise);
    }


    addEoVisit(requestData: any): Observable<EoVisit> {
        let promise: Promise<EoVisit> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(environment.SERVICE_BASE_URL + '/EOvisit/SaveEOVisit', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json()).subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<EoVisit>>Observable.fromPromise(promise);
    }

    getEoVisitByCompanyId(): Observable<EoVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<EoVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/EOvisit/getByCompanyId/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let eoVisits = (<Object[]>data).map((data: any) => {
                        return EoVisitAdapter.parseResponse(data);
                    });
                    resolve(eoVisits);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<EoVisit[]>>Observable.fromPromise(promise);
    }

    getEoVisitByCompanyAndDoctorId(doctorId: number): Observable<EoVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;       
        let promise: Promise<EoVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/EOvisit/getByCompanyAndDoctorId/' + companyId + '/' + doctorId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let eoVisits = (<Object[]>data).map((data: any) => {
                        return EoVisitAdapter.parseResponse(data);
                    });
                    resolve(eoVisits);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<EoVisit[]>>Observable.fromPromise(promise);
    }


    //------------------------------------------------------- Dashboard APIs --------------------------------------------------------//
    getPatientVisitForDateByLocationId(date: any, locationId: number): Observable<PatientVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            let forDate = date.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/dashboard/getPatientVisitForDateByLocationId/' + forDate + '/' + locationId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }
    getDoctorPatientVisitForDateByLocationId(date: any, doctorId: number, locationId: number): Observable<PatientVisit[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            let forDate = date.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/dashboard/getDoctorPatientVisitForDateByLocationId/' + forDate + '/' + doctorId + '/' + locationId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }
    getPatientVisitForDateByCompanyId(date: any, companyId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            let forDate = date.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/dashboard/getPatientVisitForDateByCompanyId/' + forDate + '/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }
    getDoctorPatientVisitForDateByCompanyId(date: any, doctorId: number, companyId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            let forDate = date.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/dashboard/getDoctorPatientVisitForDateByCompanyId/' + forDate + '/' + doctorId + '/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }
    getOpenAppointmentSlotsForDoctorByCompanyId(date: any, doctorId: number, companyId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            let inputDate = date.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/dashboard/getOpenAppointmentSlotsForDoctorByCompanyId/' + inputDate + '/' + doctorId + '/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }


    getOpenAppointmentSlotsForCompanyId(date: any, companyId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            let inputDate = date.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/dashboard/getOpenAppointmentSlotsForAllDoctorByCompanyId/' + inputDate + '/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisits = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisits);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }


    getStatisticalDataOnPatientVisit(fromDate: any, toDate: any, companyId: number): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let inputFromDate = fromDate.format('YYYY-MM-DD');
            let inputToDate = toDate.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/dashboard/getStatisticalDataOnPatientVisit/' + inputFromDate + '/' + inputToDate + '/' + companyId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    getStatisticalDataOnCaseByCaseType(fromDate: any, toDate: any, companyId: number,caseType:number): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let inputFromDate = fromDate.format('YYYY-MM-DD');
            let inputToDate = toDate.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/dashboard/getStatisticalDataOnCaseByCaseType/' + inputFromDate + '/' + inputToDate + '/' + companyId + '/' + caseType,  {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    getStatisticalDataOnCaseByInsuranceProvider(fromDate: any, toDate: any, companyId: number,caseType:number): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let inputFromDate = fromDate.format('YYYY-MM-DD');
            let inputToDate = toDate.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/dashboard/getStatisticalDataOnCaseByInsuranceProvider/' + inputFromDate + '/' + inputToDate + '/' + companyId+ '/' + caseType, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    getVisitStatusbyPatientVisitIdSpecialityId(patientVisitId: Number, specialityId: Number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientVisit/getVisitStatusbyPatientVisitSpecialityId/' + patientVisitId +'/'+ specialityId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {                    
                    
                    let patientVisit = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisit);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }
    getVisitStatusbyPatientVisitIdRoomTestId(patientVisitId: Number, roomTestId: Number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/PatientVisit/getVisitStatusbyPatientVisitRoomTestId/' + patientVisitId +'/'+ roomTestId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let patientVisit = (<Object[]>data).map((data: any) => {
                        return PatientVisitAdapter.parseResponse(data);
                    });
                    resolve(patientVisit);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    }
}


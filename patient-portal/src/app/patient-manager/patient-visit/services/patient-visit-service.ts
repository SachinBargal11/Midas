import { ImeVisit } from '../models/ime-visit';
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
import { ImeVisitAdapter } from './adapters/ime-visit-adapter';
import { EoVisitAdapter } from './adapters/eo-visit-adapter';
import { EoVisit } from '../models/eo-visit';
import { AttorneyVisitAdapter } from './adapters/Attorney-visit-adapter';
import { AttorneyVisit } from '../models/Attorney-visit';

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

    getAllVisitsByPatientId(patientId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/patientVisit/getVisitsByPatientId/' + patientId, {
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

    getVisitsByPatientId(patientId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/patientVisit/getByPatientId/' + patientId, {
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

    getImeVisitsByPatientId(patientId: number): Observable<ImeVisit[]> {
        let promise: Promise<ImeVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/IMEVisit/getByPatientId/' + patientId, {
                headers: this._headers
            })
                .map(res => res.json())
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

    getPatientVisitsByLocationId(locationId: number, patientId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/getByLocationAndPatientid/' + locationId + '/' + patientId, {
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
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            let fromDate = starDate.format('YYYY-MM-DD');
            let toDate = endDate.format('YYYY-MM-DD');
            return this._http.get(environment.SERVICE_BASE_URL + '/patientVisit/getByDoctorAndDates/' + doctorId + '/' + fromDate + '/' + toDate, {
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

    getPatientVisitsByLocationAndRoomId(locationId: number, roomId: number, patientId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/GetByLocationRoomAndPatient/' + locationId + '/' + roomId + '/' + patientId, {
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

    getPatientVisitsByLocationAndDoctorId(locationId: number, doctorId: number, patientId: number): Observable<PatientVisit[]> {
        let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/PatientVisit/getByLocationDoctorAndPatientId/' + locationId + '/' + doctorId + '/' + patientId, {
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

    updatePatientVisitDetail(patientVisitDetail: PatientVisit): Observable<PatientVisit> {
        let promise = new Promise((resolve, reject) => {
            let requestData = patientVisitDetail.toJS();
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

    updateImeVisitDetail(imeVisitDetail: ImeVisit): Observable<ImeVisit> {
        let promise = new Promise((resolve, reject) => {
            let requestData = imeVisitDetail.toJS();
            // let procedures = _.map(requestData.patientVisitProcedureCodes, (currentProcedure: Procedure) => {
            //     return { 'procedureCodeId': currentProcedure.id };
            // })
            // requestData.patientVisitProcedureCodes = procedures;
            requestData.addedByCompanyId = this._sessionStore.session.currentCompany.id;
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

    downloadDocumentForm(visitId: Number, documentId: Number): Observable<Consent[]> {
        let thefile = {};
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<Consent[]> = new Promise((resolve, reject) => {
            this._http
                .get(environment.SERVICE_BASE_URL + '/documentmanager/downloadfromnoproviderblob/' + documentId, {
                    headers: this._headers
                })
                .map(res => {
                    // If request fails, throw an Error that will be caught
                    if (res.status < 200 || res.status == 500 || res.status == 404) {
                        throw new Error('This request has failed ' + res.status);
                    }
                    // If everything went fine, return the response
                    else {

                        window.location.assign(environment.SERVICE_BASE_URL + '/documentmanager/downloadfromnoproviderblob/' + documentId);
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

    getAttorneyVisitsByPatientId(patientId: number): Observable<AttorneyVisit[]> {
        let promise: Promise<AttorneyVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/attorneyVisit/getByPatientId/' + patientId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let attorneyVisits = (<Object[]>data).map((data: any) => {
                        return AttorneyVisitAdapter.parseResponse(data);
                    });
                    resolve(attorneyVisits);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<AttorneyVisit[]>>Observable.fromPromise(promise);
    }

    //  getPatientVisitsByAttorneyCompanyId(): Observable<PatientVisit[]> {
    //     let companyId = this._sessionStore.session.currentCompany.id;
    //     let promise: Promise<PatientVisit[]> = new Promise((resolve, reject) => {
    //         return this._http.get(this._url + '/attorneyVisit/getByCompanyAndAttorneyId/' + companyId + '/' + 0)
    //             .map(res => res.json())
    //             .subscribe((data: Array<Object>) => {
    //                 let patientVisits = (<Object[]>data).map((data: any) => {
    //                     return PatientVisitAdapter.parseResponse(data);
    //                 });
    //                 resolve(patientVisits);
    //             }, (error) => {
    //                 reject(error);
    //             });

    //     });
    //     return <Observable<PatientVisit[]>>Observable.fromPromise(promise);
    // }

    getEOVisitsByPatientId(patientId: number): Observable<EoVisit[]> {
        let promise: Promise<EoVisit[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/EOVisit/getByPatientId/' + patientId, {
                headers: this._headers
            })
                .map(res => res.json())
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
}


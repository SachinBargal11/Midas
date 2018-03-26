import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { PatientVisitsStore } from '../../patient-visit/stores/patient-visit-store';
import { PatientVisit } from '../../patient-visit/models/patient-visit';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { PatientsStore } from '../../patients/stores/patients-store';
import { Patient } from '../../patients/models/patient';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Room } from '../../../medical-provider/rooms/models/room';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import * as _ from 'underscore';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../models/case';
import { Observable } from 'rxjs/Rx';
import { UnscheduledVisit } from '../../patient-visit/models/unscheduled-visit';
import { ImeVisit } from '../../patient-visit/models/ime-visit';

@Component({
    selector: 'patient-visit-ime-list',
    templateUrl: './ime-visit.html'
})

export class PatientVisitListImeComponent implements OnInit {
    selectedVisits: ImeVisit[] = [];
    selectedIMEVisits: ImeVisit[] = [];
    visits: ImeVisit[];
    caseId: number;
    patientId: number;
    datasource: ImeVisit[];
    totalRecords: number;
    imesVisits: ImeVisit[];
    patientName: string;
    patient: Patient;
    isDeleteProgress: boolean = false;
    caseStatusId: number;
    viewall: false;
    

    selectedVisitId: number;
    selectedVisit: ImeVisit;
    visitInfo = 'Visit Info';
    visitDialogVisible = false;
    routeFromCase: true;
    addVisitDialogVisible = false;
    allVisits: {
        id: number,
        eventStart: any,
        visitType: string,
        doctorName: string,
        visitStatusLabel: string,
        isPatientVisitType: boolean
    }[] = [];
    case: Case;
    visit: any[] = [];
   

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _patientVisitStore: PatientVisitsStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _patientStore: PatientsStore,
        private _notificationsService: NotificationsService,
        private _doctorsStore: DoctorsStore,
        private _roomsStore: RoomsStore,
        private confirmationService: ConfirmationService,
        private _casesStore: CasesStore,


    ) {
        this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
        });
        this._route.parent.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
            this._progressBarService.show();
            let fetchPatient = this._patientStore.fetchPatientById(this.patientId);
            let fetchCaseDetail = this._casesStore.fetchCaseById(this.caseId);

            Observable.forkJoin([fetchPatient, fetchCaseDetail])
                .subscribe(
                (results) => {
                    this.patient = results[0];
                    this.patientName = this.patient.user.firstName + ' ' + this.patient.user.lastName;
                    this.case = results[1];
                    this.caseStatusId = this.case.caseStatusId;
                    this.visitInfo = `${this.visitInfo} - Patient Name: ${this.patient.user.displayName} - Case Id: ${this.caseId}`;

                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
    }

    ngOnInit() {
        this.loadVisits();
    }

    loadImeVisits() {
        this._progressBarService.show();
        this._patientVisitStore.getImeVisitByCaseId(this.caseId)
            .subscribe((visits: ImeVisit[]) => {
                let matchingVisits: ImeVisit[] = _.filter(visits, (currentVisit: ImeVisit) => {
                    return currentVisit.eventStart != null && currentVisit.eventEnd != null;
                });
               
                let matchingIMEVisits: ImeVisit[] = _.filter(matchingVisits, (currentVisit: ImeVisit) => {
                    return currentVisit.doctorName != null;
                });
                this.imesVisits = matchingIMEVisits.reverse();
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

   
    loadVisits() {
        this._progressBarService.show();
        let imeVisits = this._patientVisitStore.getImeVisitByCaseId(this.caseId);
        Observable.forkJoin([imeVisits])
            .subscribe((results: any[]) => {
                let imeVisitDetails = results[0];
             
                let matchingVisits: ImeVisit[];
                if(!this.viewall)
                {
                    matchingVisits = imeVisitDetails;
                }
                else
                {
                    matchingVisits = _.filter(imeVisitDetails, (currentVisit: ImeVisit) => {
                        return currentVisit.visitStatusLabel === 'Complete';
                    });
                }

                let matchingImeVisits: ImeVisit[] = _.filter(matchingVisits, (currentVisit: ImeVisit) => {
                    return currentVisit.doctorName != null ;
                });
                let imeVisits = matchingImeVisits.reverse();
                let doctorname = "";
                let mappedAllVisits: {
                    id: number,
                    eventStart: any,
                    visitType: string,
                    doctorName: string,
                    visitStatusLabel: string,
                    isPatientVisitType: boolean,
                    visitTimeStatus: boolean,
                    visitUpdateStatus:boolean
                }[] = [];
                _.forEach(imeVisits, (currIMEVisit: ImeVisit) => {                    
                    doctorname = currIMEVisit.doctorName == null ? "" : currIMEVisit.doctorName;
                    mappedAllVisits.push({
                        id: currIMEVisit.id,
                        eventStart: currIMEVisit.eventStart == null ? currIMEVisit.calendarEvent.eventStart.format('MMMM Do YYYY') : currIMEVisit.eventStart.format('MMMM Do YYYY'),
                        visitType: 'IME Visit',
                        doctorName: doctorname,
                        visitStatusLabel: currIMEVisit.visitStatusLabel,
                        isPatientVisitType: true,
                        visitTimeStatus:currIMEVisit.visitTimeStatus,
                        visitUpdateStatus:currIMEVisit.visitUpdateStatus,
                    })
                })
              
                this.allVisits = mappedAllVisits;

            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });

    }

    loadImeVisitsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.visits = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    fetchImeVisit(visitId: number) {
        this._progressBarService.show();
        this._patientVisitStore.fetchImeVisitById(visitId)
            .subscribe((visit: ImeVisit) => {
                this.selectedVisit = visit;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    showDialog(visit: any) {
        if (visit.isPatientVisitType) {
            this.fetchImeVisit(visit.id);
            this.selectedVisitId = visit.id;
            this.visitDialogVisible = true;
        } 
    }

    addVisitDialog() {
        this.addVisitDialogVisible = true;
    }

    closeAddVisitDialog() {
        this.addVisitDialogVisible = false;
    }

    handleVisitDialogHide() {
        this.selectedVisitId = null;
    }

    closePatientVisitDialog() {
        this.visitDialogVisible = false;
        this.handleVisitDialogHide();
        this.loadVisits();
    }

    refreshEvents(event) {
        this.loadVisits();
    }
   
}
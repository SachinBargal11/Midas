import { UnscheduledVisit } from '../../patient-visit/models/unscheduled-visit';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
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
import { SessionStore } from '../../../commons/stores/session-store';
import { Observable } from 'rxjs/Rx';
import { ReferralDocument } from '../models/referral-document';
import { ConsentStore } from '../../cases/stores/consent-store';
@Component({
    selector: 'patient-visit-doctor-list',
    templateUrl: './doctor-visit.html'
})

export class PatientVisitListDoctorComponent implements OnInit {
    allVisits: {
        id: number,
        eventStart: any,
        locationName: string,
        visitType: string,
        doctorName: string,
        specialityName: string,
        visitStatusLabel: string,
        isPatientVisitType: boolean,
        isUnscheduledVisitType: boolean,
        medicalProviderName: string
    }[] = [];
    selectedVisits: PatientVisit[] = [];
    selectedDoctorsVisits: PatientVisit[] = [];
    selectedRoomsVisits: PatientVisit[] = [];
    visits: PatientVisit[];
    caseId: number;
    patientId: number;
    datasource: PatientVisit[];
    totalRecords: number;
    currentDoctorName: string;
    currentRoomName: string;
    // matchingVisits: PatientVisit[];
    doctorsVisits: PatientVisit[];
    roomsVisits: PatientVisit[];
    // doctors:Doctor[];
    doctor: Doctor;
    room: Room;
    patientName: string;
    patient: Patient;
    isDeleteProgress = false;
    caseStatusId: number;

    selectedVisitId: number;
    selectedVisit: PatientVisit;
    visitInfo = 'Visit Info';
    visitDialogVisible = false;
    addVisitDialogVisible = false;
    unscheduledDialogVisible = false;
    unscheduledEditVisitDialogVisible = false;
    unscheduledVisitDialogVisible = false;
    case: Case;
    routeFromCase: true;
    unscheduledVisits: UnscheduledVisit[];
    unscheduledVisit: UnscheduledVisit;
    visit: any[] = [];
    selectedUnscheduledVisit: UnscheduledVisit[] = [];
    patientVisitId: number;
    viewall: false;
    id:number=0;

    constructor(
        private _fb: FormBuilder,
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
        public sessionStore: SessionStore,
        private _consentStore: ConsentStore
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

        // this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
        //     this.caseId = parseInt(routeParams.caseId, 10);
        //     this._progressBarService.show();
        //     let result = this._casesStore.fetchCaseById(this.caseId);
        //     result.subscribe(
        //         (caseDetail: Case) => {
        //             this.case = caseDetail;
        //             this.caseStatusId = caseDetail.caseStatusId;
        //         },
        //         (error) => {
        //             this._router.navigate(['../'], { relativeTo: this._route });
        //             this._progressBarService.hide();
        //         },
        //         () => {
        //             this._progressBarService.hide();
        //         });
        // });

        // this._route.parent.parent.parent.parent.params.subscribe((routeParams: any) => {
        //     this.patientId = parseInt(routeParams.patientId, 10);
        //     this._progressBarService.show();
        //     this._patientStore.fetchPatientById(this.patientId)
        //         .subscribe(
        //         (patient: Patient) => {
        //             this.patient = patient;
        //             this.patientName = patient.user.firstName + ' ' + patient.user.lastName;
        //         },
        //         (error) => {
        //             this._router.navigate(['../'], { relativeTo: this._route });
        //             this._progressBarService.hide();
        //         },
        //         () => {
        //             this._progressBarService.hide();
        //         });
        // });

    }

    ngOnInit() {
        this.loadVisits();
        // this.loadPatientVisits();
        // this.loadUnscheduledVisits();
    }
    

    loadPatientVisits() {
        this._progressBarService.show();
        this._patientVisitStore.getPatientVisitsByCaseId(this.caseId)
            .subscribe((visits: PatientVisit[]) => {
                let matchingVisits: PatientVisit[] = _.filter(visits, (currentVisit: PatientVisit) => {
                    return currentVisit.eventStart != null && currentVisit.eventEnd != null;
                });

                // this.visits = matchingVisits.reverse();
                let matchingDoctorVisits: PatientVisit[] = _.filter(matchingVisits, (currentVisit: PatientVisit) => {
                    return currentVisit.doctor != null && currentVisit.specialtyId != null;
                });
                this.doctorsVisits = matchingDoctorVisits.reverse();

                let matchingRoomVisits: PatientVisit[] = _.filter(matchingVisits, (currentVisit: PatientVisit) => {
                    return currentVisit.room != null;
                });
                this.roomsVisits = matchingRoomVisits.reverse();                
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadUnscheduledVisits() {
        this._progressBarService.show();
        this._patientVisitStore.getUnscheduledVisitsByCaseId(this.caseId)
            .subscribe((unscheduledVisits: UnscheduledVisit[]) => {
                this.unscheduledVisits = unscheduledVisits;
            })
    }

    loadVisits() {
        this._progressBarService.show();
        let patientVisits = this._patientVisitStore.getPatientVisitsByCaseId(this.caseId);
        let unscheduleVisits = this._patientVisitStore.getUnscheduledVisitsByCaseId(this.caseId);
        Observable.forkJoin([patientVisits, unscheduleVisits])
            .subscribe((results: any[]) => {                                
                let patientVisitDetails = results[0];                                    
                // let matchingVisits: PatientVisit[] = _.filter(patientVisitDetails, (currentVisit: PatientVisit) => {
                //     return currentVisit.eventStart != null && currentVisit.eventEnd != null;
                // });                
                // this.visits = matchingVisits.reverse();                       
                let matchingVisits: PatientVisit[];
                if(!this.viewall)
                {
                    matchingVisits = patientVisitDetails;
                }
                else
                {
                    matchingVisits = _.filter(patientVisitDetails, (currentVisit: PatientVisit) => {
                        return currentVisit.visitStatusLabel === 'Complete';
                    });
                }

                let matchingDoctorVisits: PatientVisit[] = _.filter(matchingVisits, (currentVisit: PatientVisit) => {
                    return currentVisit.doctor != null && currentVisit.specialtyId != null;
                });
                
                let doctorsVisits = matchingDoctorVisits.reverse();
                let unscheduledVisits = results[1];


                let unschmatchingVisits: UnscheduledVisit[];
                if(!this.viewall)
                {
                    unschmatchingVisits = unscheduledVisits;
                }
                else
                {
                    unschmatchingVisits = _.filter(unscheduledVisits, (currentVisit: UnscheduledVisit) => {
                        return currentVisit.visitStatusLabel === 'Complete';
                    });
                }                
                
                let unscheduleddoctorsVisits = unschmatchingVisits.reverse();

                let mappedAllVisits: {
                    id: number,
                    eventStart: any,
                    locationName: string,
                    visitType: string,
                    doctorName: string,
                    specialityName: string,
                    visitStatusLabel: string,
                    isPatientVisitType: boolean,
                    isUnscheduledVisitType: boolean,
                    medicalProviderName: string,
                    visitTimeStatus: boolean,
                    referralDocument : ReferralDocument[]
                }[] = [];
                _.forEach(doctorsVisits, (currDoctorVisit: PatientVisit) => {                    
                    mappedAllVisits.push({
                        id: currDoctorVisit.id,
                        eventStart: currDoctorVisit.eventStart == null ? currDoctorVisit.calendarEvent.eventStart.format('MMMM Do YYYY') : currDoctorVisit.eventStart.format('MMMM Do YYYY'),
                        locationName: currDoctorVisit.location.name,
                        visitType: 'Patient Visit',
                        doctorName: currDoctorVisit.doctor.user.displayName,
                        specialityName: currDoctorVisit.specialty.displayName,
                        visitStatusLabel: currDoctorVisit.visitStatusLabel,
                        isPatientVisitType: true,
                        isUnscheduledVisitType: false,
                        medicalProviderName: null,
                        visitTimeStatus: currDoctorVisit.visitTimeStatus,
                        referralDocument:currDoctorVisit.referralDocument
                    })
                });
                _.forEach(unscheduleddoctorsVisits, (currDoctorVisit: UnscheduledVisit) => {
                    if (currDoctorVisit.specialtyId != null) {
                        mappedAllVisits.push({
                            id: currDoctorVisit.id,
                            eventStart: currDoctorVisit.eventStart.format('MMMM Do YYYY'),
                            locationName: currDoctorVisit.locationName,
                            visitType: 'Unscheduled Visit',
                            doctorName: currDoctorVisit.doctorName,
                            specialityName: currDoctorVisit.specialty ? currDoctorVisit.specialty.name : '',
                            visitStatusLabel: currDoctorVisit.visitStatusLabel,
                            isPatientVisitType: false,
                            isUnscheduledVisitType: true,
                            medicalProviderName: currDoctorVisit.medicalProviderName,
                            visitTimeStatus: true,
                            referralDocument: null
                        });
                    }
                });
                this.allVisits = mappedAllVisits;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    DownloadPdf(document: ReferralDocument) {        
       // window.location.assign(this._url + '/FileUpload/download/' + document.referralId + '/' + document.midasDocumentId);
       this._consentStore.downloadRefferalFormByRefferalIdDocumetId(document.referralId, document.midasDocumentId)
       .subscribe(
       (response) => {
           // this.document = document
           // window.location.assign(this._url + '/fileupload/download/' + this.caseId + '/' + documentId);
       },
       (error) => {
           let errString = 'Unable to download';
           let notification = new Notification({
               'messages': 'Unable to download',
               'type': 'ERROR',
               'createdAt': moment()
           });
           this._progressBarService.hide();
           //  this._notificationsStore.addNotification(notification);
           this._notificationsService.error('Oh No!', 'Unable to download');
       },
       () => {
           this._progressBarService.hide();
       });
    }

    loadPatientVisitsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.visits = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    fetchPatientVisit(visitId: number) {
        // this._progressBarService.show();
        this._patientVisitStore.fetchPatientVisitById(visitId)
            .subscribe((visit: PatientVisit) => {
                this.selectedVisit = visit;
                this.visitDialogVisible = true;
            },
            (error) => {
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });
    }

    showDialog(visit: any) {
        if (visit.isPatientVisitType) {
            this.fetchPatientVisit(visit.id);
            this.selectedVisitId = visit.id;
            this.visitDialogVisible = true;
        } else if (visit.isUnscheduledVisitType) {
            this._patientVisitStore.getUnscheduledVisitDetailById(visit.id)
                .subscribe((visit: UnscheduledVisit) => {                                      
                    this.unscheduledVisit = visit;
                    let isinpast = visit.eventStart.isBefore(moment());
                    if(isinpast)
                    {
                        this.id = 0;
                        this.unscheduledDialogVisible = true;
                        this.unscheduledEditVisitDialogVisible = false;
                    }
                    else{
                        this.id = visit.id;
                        this.unscheduledDialogVisible = false;
                        this.unscheduledEditVisitDialogVisible = true;                       
                    }                    
                });
        }
    }

    showDialogEdit(visit: any) {
         if (visit.isUnscheduledVisitType) {
            this._patientVisitStore.getUnscheduledVisitDetailById(visit.id)
                .subscribe((visit: UnscheduledVisit) => {
                    debugger;
                    this.unscheduledVisit = visit;
                    this.id = visit.id;
                    this.unscheduledDialogVisible = false;
                    this.unscheduledEditVisitDialogVisible = true;
                });
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
        this.unscheduledDialogVisible = false;
        this.unscheduledEditVisitDialogVisible = false;
    }

    unscheduledVisitDialog() {
        this.caseId;
        this.patientId;
        this.unscheduledVisitDialogVisible = true;
    }

    closeDialog() {
        this.unscheduledVisitDialogVisible = false;
    }

    refreshEvents(event) {
        this.loadVisits();
    }

    deletePatientVisits() {
        this.selectedVisits = _.union(this.selectedRoomsVisits, this.selectedDoctorsVisits);
        if (this.selectedVisits.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedVisits.forEach(currentVisit => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        let result;
                        result = this._patientVisitStore.deletePatientVisit(currentVisit);
                        result.subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Visit deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()
                                });
                                this.loadPatientVisits();
                                this._notificationsStore.addNotification(notification);
                                this.selectedVisits = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete visits';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedVisits = [];
                                this._progressBarService.hide();
                                this.isDeleteProgress = false;
                                this._notificationsStore.addNotification(notification);
                                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                            },
                            () => {
                                this.isDeleteProgress = false;
                                this._progressBarService.hide();
                            });
                    });
                }
            });
        } else {
            let notification = new Notification({
                'title': 'Select visit to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select visit to delete');
        }
    }

    bill() {
        this._notificationsService.success('Success', 'Bill No AB69852 has been successfully created');
    }
}

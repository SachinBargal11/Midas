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

@Component({
    selector: 'patient-visit-treatingroom-list',
    templateUrl: './treatingroom-visit.html'
})

export class PatientVisitListTreatingRoomComponent implements OnInit {
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
    doctors: Doctor[];
    doctor: Doctor;
    room: Room;
    patientName: string;
    patient: Patient;
    isDeleteProgress: boolean = false;
    caseStatusId: number;
    viewall: false;

    selectedVisitId: number;
    selectedVisit: PatientVisit;
    visitInfo = 'Visit Info';
    visitDialogVisible = false;
    routeFromCase: true;
    addVisitDialogVisible = false;
    unscheduledVisits: UnscheduledVisit[];
    unscheduledVisit: UnscheduledVisit;
    allVisits: {
        id: number,
        eventStart: any,
        locationName: string,
        visitType: string,
        // doctorName: string,
        roomTestName: string,
        visitStatusLabel: string,
        isPatientVisitType: boolean,
        isUnscheduledVisitType: boolean,
        medicalProviderName: string
    }[] = [];
    case: Case;
    visit: any[] = [];
    unscheduledDialogVisible = false;
    unscheduledVisitDialogVisible = false;

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
                    return currentVisit.doctor != null;
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
                // let matchingDoctorVisits: PatientVisit[] = _.filter(matchingVisits, (currentVisit: PatientVisit) => {
                //     return currentVisit.doctor != null && currentVisit.specialtyId != null;
                // });
                debugger;
                let matchingVisits: PatientVisit[];
                if(this.viewall)
                {
                    matchingVisits = patientVisitDetails;
                }
                else
                {
                    matchingVisits = _.filter(patientVisitDetails, (currentVisit: PatientVisit) => {
                        return currentVisit.visitStatusLabel === 'Complete';
                    });
                }

                let matchingRoomVisits: PatientVisit[] = _.filter(matchingVisits, (currentVisit: PatientVisit) => {
                    return currentVisit.room != null && currentVisit.roomId != null;
                });
                let roomsVisits = matchingRoomVisits.reverse();
                let unscheduledVisits = results[1];
                let doctorname = "";
                let mappedAllVisits: {
                    id: number,
                    eventStart: any,
                    locationName: string,
                    visitType: string,
                     doctorName: string,
                    roomTestName: string,
                    visitStatusLabel: string,
                    isPatientVisitType: boolean,
                    isUnscheduledVisitType: boolean,
                    medicalProviderName: string,
                    visitTimeStatus: boolean
                }[] = [];
                _.forEach(roomsVisits, (currRoomVisit: PatientVisit) => {                    
                    doctorname = currRoomVisit.doctor == null ? "" : currRoomVisit.doctor.user.displayName;
                    mappedAllVisits.push({
                        id: currRoomVisit.id,
                        eventStart: currRoomVisit.eventStart == null ? currRoomVisit.calendarEvent.eventStart.format('MMMM Do YYYY') : currRoomVisit.eventStart.format('MMMM Do YYYY'),
                        locationName: currRoomVisit.location.name,
                        visitType: 'Patient Visit',
                         doctorName: doctorname,
                        roomTestName: currRoomVisit.room.roomTest.name,
                        visitStatusLabel: currRoomVisit.visitStatusLabel,
                        isPatientVisitType: true,
                        isUnscheduledVisitType: false,
                        medicalProviderName: null,
                        visitTimeStatus: currRoomVisit.visitTimeStatus
                    })
                })
                _.forEach(unscheduledVisits, (currRoomVisit: UnscheduledVisit) => {
                    if (currRoomVisit.roomTestId != null) {                        
                        mappedAllVisits.push({
                            id: currRoomVisit.id,
                            eventStart: currRoomVisit.eventStart.format('MMMM Do YYYY'),
                            locationName: currRoomVisit.locationName,
                            visitType: 'Unscheduled Visit',
                             doctorName: currRoomVisit.doctorName,
                            roomTestName: currRoomVisit.roomTest ? currRoomVisit.roomTest.name : '',
                            visitStatusLabel: currRoomVisit.status,
                            isPatientVisitType: false,
                            isUnscheduledVisitType: true,
                            medicalProviderName: currRoomVisit.medicalProviderName,
                            visitTimeStatus: currRoomVisit.visitTimeStatus
                        })
                    }

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

    loadPatientVisitsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.visits = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    // doctorName(doctorId: number) {

    //     this._doctorsStore.fetchDoctorById(doctorId)
    //         .subscribe(doctor => {
    //             this.doctor = doctor;
    //             this.currentDoctorName = this.doctor.user.firstName + '' + this.doctor.user.lastName;

    //         });

    // }
    // return this.currentDoctorName = this.doctor.user.firstName + '' + this.doctor.user.lastName;

    // roomName(roomId: number) {

    //     this._roomsStore.fetchRoomById(roomId)
    //         .subscribe(room => {
    //             this.room = room;
    //             this.currentRoomName = room.roomTest.name;
    //         });

    // }

    fetchPatientVisit(visitId: number) {
        this._progressBarService.show();
        this._patientVisitStore.fetchPatientVisitById(visitId)
            .subscribe((visit: PatientVisit) => {
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
            this.fetchPatientVisit(visit.id);
            this.selectedVisitId = visit.id;
            this.visitDialogVisible = true;
        } else if (visit.isUnscheduledVisitType) {
            this._patientVisitStore.getUnscheduledVisitDetailById(visit.id)
                .subscribe((visit: UnscheduledVisit) => {
                    this.unscheduledVisit = visit;
                    this.unscheduledDialogVisible = true;
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
        this.unscheduledDialogVisible = false;
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
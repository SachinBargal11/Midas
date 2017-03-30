import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng';
import { PatientVisitsStore } from '../../patient-manager/patient-visit/stores/patient-visit-store';
import { PatientVisit } from '../../patient-manager/patient-visit/models/patient-visit';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import { Notification } from '../../commons/models/notification';
import * as moment from 'moment';
import { SessionStore } from '../../commons/stores/session-store';
import { PatientsStore } from '../../patient-manager/patients/stores/patients-store';
import { Patient } from '../../patient-manager/patients/models/patient';
import { Doctor } from '../../medical-provider/users/models/doctor';
import { Room } from '../../medical-provider/rooms/models/room';
import { DoctorsStore } from '../../medical-provider/users/stores/doctors-store';
// import { RoomsStore } from '../../medical-provider/rooms/stores/rooms-store';
import { ProgressBarService } from '../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import * as _ from 'underscore';

@Component({
    selector: 'doctor-appointment',
    templateUrl: './doctor-appointment.html'
})

export class DoctorAppointmentComponent {
    selectedVisits: PatientVisit[] = [];
    selectedDoctorsVisits: PatientVisit[] = [];
    visits: PatientVisit[];
    caseId: number;
    doctorId: number;
    patientId: number;
    datasource: PatientVisit[];
    totalRecords: number;
    currentDoctorName: string;
    doctorsVisits: PatientVisit[];
    roomsVisits: PatientVisit[];
    doctor: Doctor;
    patientName: string;
    patient: Patient;
    startDate: Date;
    endDate: Date;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _patientVisitStore: PatientVisitsStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _patientStore: PatientsStore,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _doctorsStore: DoctorsStore,
        // private _roomsStore: RoomsStore,
    ) {
            this.doctorId = this._sessionStore.session.user.id;

    }

    ngOnInit() {
         this.startDate = moment().toDate();
         this.endDate = moment().toDate();
        this.loadPatientVisits();
    }

    loadPatientVisits() {
        this._progressBarService.show();
        // this._patientVisitStore.getVisitsByDatesAndDoctorId(moment(this.startDate), moment(this.endDate), this.doctorId)
        this._patientVisitStore.getVisitsByDoctorAndDates(moment(this.startDate), moment(this.endDate), this.doctorId)
            .subscribe((visits: PatientVisit[]) => {
                // visits.forEach(visit => {
                //     this._patientStore.fetchPatientById(visit.patientId)
                //         .subscribe((patient) => {
                //             visit.patient2 = patient;
                //         });
                // });
                this.doctorsVisits = visits.reverse();

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

    deleteVisits() {
        // this.selectedVisits = _.union(this.selectedRoomsVisits, this.selectedDoctorsVisits);
        this.selectedVisits = this.selectedDoctorsVisits;
        if (this.selectedVisits.length > 0) {
            this.selectedVisits.forEach(currentVisit => {
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
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this._progressBarService.hide();
                    });
            });
        } else {
            let notification = new Notification({
                'title': 'select visit to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select visit to delete');
        }
    }
}

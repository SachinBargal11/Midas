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
// import { DoctorsStore } from '../../medical-provider/users/stores/doctors-store';
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
    selectedRoomsVisits: PatientVisit[] = [];
    visits: PatientVisit[];
    caseId: number;
    doctorId: number;
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

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _patientVisitStore: PatientVisitsStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _patientStore: PatientsStore,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        // private _doctorsStore: DoctorsStore,
        // private _roomsStore: RoomsStore,
    ) {
        // this._route.parent.parent.params.subscribe((routeParams: any) => {
        //     this.caseId = parseInt(routeParams.caseId, 10);
        // });

        // this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
        //     this.patientId = parseInt(routeParams.patientId, 10);
            this.doctorId = this._sessionStore.session.user.id;

    }

    ngOnInit() {
        this.loadPatientVisits();
    }

    loadPatientVisits() {
        this._progressBarService.show();
        this._patientVisitStore.getPatientVisitsByDoctorId(this.doctorId)
            .subscribe((visits: PatientVisit[]) => {
                let matchingVisits: PatientVisit[] = _.filter(visits, (currentVisit: PatientVisit) => {
                    return currentVisit.eventStart != null && currentVisit.eventEnd != null;
                });

                // this.visits = matchingVisits.reverse();
                let matchingDoctorVisits: PatientVisit[] = _.filter(matchingVisits, (currentVisit: PatientVisit) => {
                    return currentVisit.doctor != null;
                });
                this.doctorsVisits = matchingDoctorVisits.reverse();

                // let matchingRoomVisits: PatientVisit[] = _.filter(matchingVisits, (currentVisit: PatientVisit) => {
                //     return currentVisit.room != null;
                // });
                // this.roomsVisits = matchingRoomVisits.reverse();


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

    deletePatientVisits() {
        this.selectedVisits = _.union(this.selectedRoomsVisits, this.selectedDoctorsVisits);
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

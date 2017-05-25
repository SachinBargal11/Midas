import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { PatientsStore } from '../stores/patients-store';
import { Patient } from '../models/patient';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { ReferralStore } from '../../cases/stores/referral-store';
import { Referral } from '../../cases/models/referral';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';


@Component({
    selector: 'patients-list',
    templateUrl: './patients-list.html'
})

export class PatientsListComponent implements OnInit {
    selectedPatients: Patient[] = [];
    patients: Patient[];
    referrals: Referral[];
    datasource: Patient[];
    totalRecords: number;
    isDeleteProgress:boolean = false;

    constructor(
        private _router: Router,
        private _patientsStore: PatientsStore,
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _referralStore: ReferralStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,

    ) {
        this.sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadPatientsCheckingDoctor();
            this._router.navigate(['/patient-manager/patients']);
        });
    }

    ngOnInit() {
        this.loadPatientsCheckingDoctor();
    }
    loadPatientsCheckingDoctor() {
        let doctorRoleOnly = null;
        let roles = this.sessionStore.session.user.roles;
        if (roles) {
            if (roles.length === 1) {
                doctorRoleOnly = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
            }
            if (doctorRoleOnly) {
                this.loadPatientsByCompanyAndDoctor();
            } else {
                this.loadPatients();
            }
        }
    }

    loadPatients() {
        this._progressBarService.show();
        this._patientsStore.getPatients()
            .subscribe(patients => {
                this.patients = patients.reverse();
                // this.datasource = patients.reverse();
                // this.totalRecords = this.datasource.length;
                // this.patients = this.datasource.slice(0, 10);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    loadPatientsByCompanyAndDoctor() {
        this._progressBarService.show();
        this._patientsStore.getPatientsByCompanyAndDoctorId()
            .subscribe(patients => {
                this.patients = patients.reverse();
                // this.datasource = patients.reverse();
                // this.totalRecords = this.datasource.length;
                // this.patients = this.datasource.slice(0, 10);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadPatientsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.patients = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }
    deletePatients() {
        if (this.selectedPatients.length > 0) {
            this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
            this.selectedPatients.forEach(currentPatient => {
                this.isDeleteProgress = true;
                // this._progressBarService.show();
                let result;
                result = this._patientsStore.deletePatient(currentPatient);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Patient ' + currentPatient.user.firstName + ' ' + currentPatient.user.lastName + ' deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadPatients();
                        this._notificationsStore.addNotification(notification);
                        this.selectedPatients = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete Patient ' + currentPatient.user.firstName + ' ' + currentPatient.user.lastName;
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedPatients = [];
                        // this._progressBarService.hide();
                        this.isDeleteProgress = false;
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        // this._progressBarService.hide();
                        this.isDeleteProgress = false;
                    });
            });
            }
            });
        } else {
            let notification = new Notification({
                'title': 'select patients to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select patients to delete');
        }
    }
    showMsg() {
            this._notificationsService.error('Oh No!', 'There is no consent for this case');
    }

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsStore } from '../stores/patients-store';
import { Patient } from '../models/patient';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';

@Component({
    selector: 'patients-list',
    templateUrl: './patients-list.html'
})

export class PatientsListComponent implements OnInit {
    selectedPatients: Patient[] = [];
    patients: Patient[];

    constructor(
        private _router: Router,
        private _patientsStore: PatientsStore,
        private _notificationsStore: NotificationsStore,
        public _sessionStore: SessionStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadPatients();
            this._router.navigate(['/patient-manager/patients']);
        });
    }

    ngOnInit() {
        this.loadPatients();
    }

    loadPatients() {
        this._progressBarService.show();
        this._patientsStore.getPatients()
            .subscribe(patients => {
                this.patients = patients;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    deletePatients() {
        if (this.selectedPatients.length > 0) {
            this.selectedPatients.forEach(currentPatient => {
                this._progressBarService.show();
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
                'title': 'select patients to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select patients to delete');
        }
    }

}
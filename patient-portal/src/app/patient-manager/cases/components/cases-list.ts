import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { CasesStore } from '../stores/case-store';
import { Case } from '../models/case';
import { Patient } from '../../patients/models/patient';
import { PatientsStore } from '../../patients/stores/patients-store';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';

@Component({
    selector: 'caseslist',
    templateUrl: './cases-list.html'
})


export class CasesListComponent implements OnInit {
    cases: Case[];
    patientId: number;
    patientName: string;
    patient: Patient;
    selectedCases: Case[] = [];
    datasource: Case[];
    totalRecords: number;

    constructor(
        public _route: ActivatedRoute,
        private _router: Router,
        public sessionStore: SessionStore,
        private _casesStore: CasesStore,
        private _patientStore: PatientsStore,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
       public notificationsStore: NotificationsStore,
    ) {
        // this._route.parent.params.subscribe((routeParams: any) => {
        //     this.patientId = parseInt(routeParams.patientId, 10);
        this.patientId = this.sessionStore.session.user.id;
        this.progressBarService.show();
        this._patientStore.fetchPatientById(this.patientId)
            .subscribe(
            (patient: Patient) => {
                this.patient = patient;
                this.patientName = patient.user.firstName + ' ' + patient.user.lastName;
            },
            (error) => {
                this._router.navigate(['../'], { relativeTo: this._route });
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
            });
        // });
    }
    ngOnInit() {
        this.loadCases();
    }

    loadCases() {
        this.progressBarService.show();
        this._casesStore.getCases(this.patientId)
            .subscribe(cases => {
                this.cases = cases.reverse();
                // this.datasource = cases.reverse();
                // this.totalRecords = this.datasource.length;
                // this.cases = this.datasource.slice(0, 10);
            },
            (error) => {
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
            });
    }
    loadCasesLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.cases = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteCases() {
        if (this.selectedCases.length > 0) {
            this.selectedCases.forEach(currentCase => {
                this.progressBarService.show();
                this._casesStore.deleteCase(currentCase)
                    .subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Case deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadCases();
                        this.notificationsStore.addNotification(notification);
                        this.selectedCases = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete case';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedCases = [];
                        this.progressBarService.hide();
                        this.notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this.progressBarService.hide();
                    });
            });
        } else {
            let notification = new Notification({
                'title': 'select case to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this.notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select case to delete');
        }
    }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
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
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { AddConsent } from '../models/add-consent-form';
import { Company } from '../../../account/models/company';
import * as _ from 'underscore';

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
    isDeleteProgress: boolean = false;
    consentRecived: string = '';

    constructor(
        public _route: ActivatedRoute,
        private _router: Router,
        private _sessionStore: SessionStore,
        private _casesStore: CasesStore,
        private _patientStore: PatientsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _notificationsStore: NotificationsStore,
        private confirmationService: ConfirmationService,
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
            this._progressBarService.show();
            this._patientStore.fetchPatientById(this.patientId)
                .subscribe(
                (patient: Patient) => {
                    this.patient = patient;
                    this.patientName = patient.user.firstName + ' ' + patient.user.lastName;
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
        this.loadCases();
    }

    loadCases() {
        this._progressBarService.show();
        this._casesStore.getCases(this.patientId)
            .subscribe(cases => {
                this.cases = cases.reverse();
                // this.datasource = cases.reverse();
                // this.totalRecords = this.datasource.length;
                // this.cases = this.datasource.slice(0, 10);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    consentAvailable(case1: Case) {
        // let matchingCases: Case[] = _.map(this.cases, (currentCase: Case) => {
        //     return currentCase.companyCaseConsentApproval.length > 0 ? currentCase : null;
        // });
        if (case1.companyCaseConsentApproval.length > 0) {
            let consentAvailable = _.find(case1.companyCaseConsentApproval, (currentConsent: AddConsent) => {
                return currentConsent.companyId === this._sessionStore.session.currentCompany.id;
                // if (currentConsent.companyId === this._sessionStore.session.currentCompany.id) {
                //     return this.consentRecived = 'Yes';
                // } else if (currentConsent.companyId !== this._sessionStore.session.currentCompany.id){
                //     return this.consentRecived = 'No';
                // }
            });
            if (consentAvailable) {
                return this.consentRecived = 'Yes';
            } else {
                return this.consentRecived = 'No';
            }
        } else {
            return this.consentRecived = 'No';
        }


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
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedCases.forEach(currentCase => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        this._casesStore.deleteCase(currentCase)
                            .subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Case deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()

                                });
                                this.loadCases();
                                this._notificationsStore.addNotification(notification);
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
                'title': 'select case to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select case to delete');
        }
    }
}
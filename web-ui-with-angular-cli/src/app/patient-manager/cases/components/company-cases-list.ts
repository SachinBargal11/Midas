import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../../cases/models/case';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';


@Component({
    selector: 'company-cases',
    templateUrl: './company-cases-list.html'
})


export class CompanyCasesComponent implements OnInit {
    cases: any[];
    selectedCases: Case[] = [];
    datasource: Case[];
    totalRecords: number;

    constructor(
        public _route: ActivatedRoute,
        private _router: Router,
        private _sessionStore: SessionStore,
        private _casesStore: CasesStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _notificationsStore: NotificationsStore,

    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadCasesCheckingDoctor();
        });
    }
    ngOnInit() {
        this.loadCasesCheckingDoctor();
    }
    loadCasesCheckingDoctor() {
        let doctorRoleOnly;
        let roles = this._sessionStore.session.user.roles;
        if (roles) {
            if (roles.length === 1) {
                doctorRoleOnly = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
            }
            if (doctorRoleOnly) {
                this.loadCasesByCompanyAndDoctorId();
            } else {
                this.loadCases();
            }
        }
    }

    loadCases() {
        this._progressBarService.show();
        this._casesStore.getCasesByCompany()
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
    loadCasesByCompanyAndDoctorId() {
        this._progressBarService.show();
        this._casesStore.getCasesByCompanyAndDoctorId()
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
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this._progressBarService.hide();
                    });
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
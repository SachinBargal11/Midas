import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/primeng'
import { AttorneyMasterStore } from '../../stores/attorney-store';
import { Attorney } from '../../models/attorney';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { MedicalProviderMasterStore } from '../../stores/medical-provider-master-store';

@Component({
    selector: 'attorney-master-list',
    templateUrl: './attorney-master-list.html'
})

export class AttorneyMasterListComponent implements OnInit {
    displayToken: boolean = false;
    currentAttorneyId: number = 0;
    selectedAttorneys: Attorney[] = [];
    attorneys: Attorney[];
    allAttorneys: Attorney[];
    datasource: Attorney[];
    totalRecords: number;
    companyId: number;
    patientId: number;
    isDeleteProgress: boolean = false;
    displayValidation: boolean = false;
    otp: string;
    medicalProviderName: string;
    validateOtpResponse: any;
    addAttorneyByToken: FormGroup;
    addAttorneyByTokenControls;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _attorneyMasterStore: AttorneyMasterStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private _medicalProviderMasterStore: MedicalProviderMasterStore,
    ) {
         this.addAttorneyByToken = this.fb.group({
            token: ['', Validators.required],
        })
        this.addAttorneyByTokenControls = this.addAttorneyByToken.controls
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadAttorney();
        });

    }

    ngOnInit() {
        this.loadAttorney();
    }

     showDialog() {
        this.generateToken();
        this.displayToken = true;
    }

    showValidation() {
        this.displayValidation = true;
        this.addAttorneyByToken.reset();
    }

    closeDialog(){
  this.displayValidation = false;
    }

    generateToken() {
        this._progressBarService.show();
        this._medicalProviderMasterStore.generateToken()
            .subscribe((data: any) => {
                this.otp = data.otp;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    validateGeneratedToken() {
        this._progressBarService.show();
        this._medicalProviderMasterStore.validateToken(this.addAttorneyByToken.value.token)
            .subscribe((data: any) => {
                this.validateOtpResponse = data;
                this.medicalProviderName = this.validateOtpResponse.company.name
            },
            (error) => {
               let errString = 'Invalid token.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this.closeDialog();
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    associateAttorney() {
        this._medicalProviderMasterStore.associateValidateTokenWithCompany(this.addAttorneyByToken.value.token)
            .subscribe((data: any) => {
                let notification = new Notification({
                    'title': 'Attorney added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                // this.loadAllProviders();
                this.loadAttorney();
                this._notificationsStore.addNotification(notification);
                this.closeDialog()
            },
            (error) => {
                let errString = 'Unable to associate attorney.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadAttorney() {
        this._progressBarService.show();
        this._attorneyMasterStore.getAttorneyMasters()
            .subscribe(attorneys => {
                this.attorneys = attorneys.reverse();
                // this.datasource = attorneys.reverse();
                // this.totalRecords = this.datasource.length;
                // this.attorneys = this.datasource.slice(0, 10);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadAttorneysLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.attorneys = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteAttorneys() {
        if (this.selectedAttorneys.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {

                    this.selectedAttorneys.forEach(currentAttorney => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        let result;
                        result = this._attorneyMasterStore.deleteAttorney(currentAttorney);
                        result.subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Attorney deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()
                                });
                                this.loadAttorney();
                                this._notificationsStore.addNotification(notification);
                                this._notificationsService.success('Success!', 'Attorney deleted successfully!');
                                this.selectedAttorneys = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete Attorney';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedAttorneys = [];
                                this._progressBarService.hide();
                                this._notificationsStore.addNotification(notification);
                                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                            },
                            () => {
                                this._progressBarService.hide();
                                this.isDeleteProgress = false;
                            });
                    });
                }
            });
        } else {
            let notification = new Notification({
                'title': 'Select attorney to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select attorney to delete');
        }

    }

}
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/primeng'
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { MedicalProviderMasterStore } from '../../stores/medical-provider-master-store';
import { MedicalProviderMaster } from '../../models/medical-provider-master';
import * as _ from 'underscore';
import { Account } from '../../../account/models/account';
@Component({
    selector: 'medical-provider-list',
    templateUrl: './medical-provider-list.html'
})

export class MedicalProviderListComponent implements OnInit {
    displayToken: boolean = false;
    currentProviderId: number = 0;
    selectedProviders: MedicalProviderMaster[] = [];
    providers: MedicalProviderMaster[];
    allProviders: Account[];
    datasource: MedicalProviderMaster[];
    totalRecords: number;
    companyId: number;
    patientId: number;
    isDeleteProgress: boolean = false;
    displayValidation: boolean = false;
    otp: string;
    medicalProviderName: string;
    medicalProviderAddress: string;
    validateOtpResponse: any;
    addMedicalProviderByToken: FormGroup;
    addMedicalProviderByTokenControls;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _medicalProviderMasterStore: MedicalProviderMasterStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private confirmationService: ConfirmationService,
        private _elRef: ElementRef,
        private fb: FormBuilder,

    ) {
        this.addMedicalProviderByToken = this.fb.group({
            token: ['', Validators.required],
        })
        this.addMedicalProviderByTokenControls = this.addMedicalProviderByToken.controls

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            // this.loadAllProviders();
            this.loadMedicalProviders();
        });

    }
    ngOnInit() {
        // this.loadAllProviders();
        this.loadMedicalProviders();
    }

    showDialog() {
        this.generateToken();
        this.displayToken = true;
    }

    showValidation() {
        this.displayValidation = true;
        this.addMedicalProviderByToken.reset();
    }

    closeDialog() {
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
        this._medicalProviderMasterStore.validateToken(this.addMedicalProviderByToken.value.token)
            .subscribe((data: any) => {
                this.validateOtpResponse = data;
                this.medicalProviderName = this.validateOtpResponse.company.name;
                this.medicalProviderAddress = this.validateOtpResponse.company.location[0].name + ', ' +
                    this.validateOtpResponse.company.location[0].addressInfo.address1 + ', ' +
                    // this.validateOtpResponse.company.location[0].addressInfo.address2 + ',' +
                    this.validateOtpResponse.company.location[0].addressInfo.city + ', ' +
                    this.validateOtpResponse.company.location[0].addressInfo.state + ', ' +
                    this.validateOtpResponse.company.location[0].addressInfo.zipCode
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

    associateMedicalProvider() {
        this._medicalProviderMasterStore.associateValidateTokenWithCompany(this.addMedicalProviderByToken.value.token)
            .subscribe((data: any) => {
                let notification = new Notification({
                    'title': 'Medical provider added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                // this.loadAllProviders();
                this.loadMedicalProviders();
                this._notificationsStore.addNotification(notification);
                this.closeDialog()
            },
            (error) => {
                let errString = 'Unable to associate medical provider.';
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

    loadAllProviders() {
        this._progressBarService.show();
        this._medicalProviderMasterStore.getAllProviders()
            .subscribe((allProviders: Account[]) => {
                this.allProviders = allProviders;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadMedicalProviders() {
        this._progressBarService.show();
        this._medicalProviderMasterStore.getMedicalProviders()
            .subscribe((providers: MedicalProviderMaster[]) => {
                this.providers = providers;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    loadProvidersLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.providers = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    selectProviders(event) {
        let currentProviderId = parseInt(event.target.value);
        this.currentProviderId = currentProviderId;
    }

    assignMedicalProvider() {
        if (this.currentProviderId !== 0) {
            let result;
            result = this._medicalProviderMasterStore.assignProviders(this.currentProviderId);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Provider assigned successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this.loadAllProviders();
                    this.loadMedicalProviders();
                    this.currentProviderId = 0;
                },
                (error) => {
                    let errString = 'Unable to assign provider.';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                },
                () => {
                });

        } else {
            let notification = new Notification({
                'title': 'Select provider to assign to company',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select provider to assign to company');
        }
    }

    deleteMedicalProviders() {
        if (this.selectedProviders.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedProviders.forEach(CurrentProvider => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        let result;
                        result = this._medicalProviderMasterStore.deleteMedicalProvider(CurrentProvider);
                        result.subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Medical provider deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()
                                });
                                this.loadAllProviders();
                                this.loadMedicalProviders();
                                this._notificationsStore.addNotification(notification);
                                this.selectedProviders = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete medical provider';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedProviders = [];
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
        }
        else {
            let notification = new Notification({
                'title': 'Select medical provider to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select medical provider to delete');
        }

    }

}

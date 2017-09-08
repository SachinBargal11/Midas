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
import { AncillaryMasterStore } from '../../stores/ancillary-store';
import { AncillaryMaster } from '../../models/ancillary-master';
import * as _ from 'underscore';
import { Account } from '../../../account/models/account';
import { MedicalProviderMasterStore } from '../../stores/medical-provider-master-store';
@Component({
    selector: 'ancillary-list',
    templateUrl: './ancillary-master-list.html'
})

export class AncillaryListComponent implements OnInit {
    displayToken: boolean = false;
    currentProviderId: number = 0;
    selectedProviders: AncillaryMaster[] = [];
    providers: AncillaryMaster[];
    allProviders: Account[];
    datasource: AncillaryMaster[];
    totalRecords: number;
    companyId: number;
    patientId: number;
    isDeleteProgress: boolean = false;
    displayValidation: boolean = false;
    otp: string;
    medicalProviderName: string;
    validateOtpResponse: any;
    addAncillaryProviderByToken: FormGroup;
    addAncillaryProviderByTokenControls;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _ancillaryMasterStore: AncillaryMasterStore,
        private _medicalProviderMasterStore: MedicalProviderMasterStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private confirmationService: ConfirmationService,
        private _elRef: ElementRef,
        private fb: FormBuilder,

    ) {
         this.addAncillaryProviderByToken = this.fb.group({
            token: ['', Validators.required],
        })
        this.addAncillaryProviderByTokenControls = this.addAncillaryProviderByToken.controls

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {

            this.loadAncillaryMasters();
        });

    }
    ngOnInit() {
        //this.loadAllAncillaries();
        this.loadAncillaryMasters();
    }

    showDialog() {
        this.generateToken();
        this.displayToken = true;
    }

    showValidation() {
        this.displayValidation = true;
    }

    closeDialog(){
  this.displayValidation = false;
    }
    deleteAncillaryProviders() {}

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
        this._medicalProviderMasterStore.validateToken(this.addAncillaryProviderByToken.value.token)
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

    associateMedicalProvider() {
        this._medicalProviderMasterStore.associateValidateTokenWithCompany(this.addAncillaryProviderByToken.value.token)
            .subscribe((data: any) => {
                let notification = new Notification({
                    'title': 'Medical provider added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                // this.loadAllProviders();
                this.loadAncillaryMasters();
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

    loadAllAncillaries() {
        this._progressBarService.show();
        this._ancillaryMasterStore.getAllAncillaries()
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

    loadAncillaryMasters() {
        this._progressBarService.show();
        this._ancillaryMasterStore.getAncillaryMasters()
            .subscribe((providers: AncillaryMaster[]) => {
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

    deleteAncillary() {
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
                        result = this._ancillaryMasterStore.deleteAncillary(CurrentProvider);
                        result.subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Medical provider deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()
                                });
                                this.loadAllAncillaries();
                                this.loadAncillaryMasters();
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

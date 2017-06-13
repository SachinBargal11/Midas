import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
@Component({
    selector: 'ancillary-list',
    templateUrl: './ancillary-master-list.html'
})

export class AncillaryListComponent implements OnInit {
    currentProviderId: number = 0;
    selectedProviders: AncillaryMaster[] = [];
    providers: AncillaryMaster[];
    allProviders: Account[];
    datasource: AncillaryMaster[];
    totalRecords: number;
    companyId: number;
    patientId: number;
    isDeleteProgress: boolean = false;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _ancillaryMasterStore: AncillaryMasterStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private confirmationService: ConfirmationService,
        private _elRef: ElementRef,

    ) {

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {

            //  this.loadAncillaryMasters();
        });

    }
    ngOnInit() {
        //this.loadAllAncillaries();
        // this.loadAncillaryMasters();
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

    selectProviders(event) {
        let currentProviderId = parseInt(event.target.value);
        this.currentProviderId = currentProviderId;
    }

    assignAncillary() {
        if (this.currentProviderId !== 0) {
            let result;
            result = this._ancillaryMasterStore.assignProviders(this.currentProviderId);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Provider assigned successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this.loadAllAncillaries();
                    this.loadAncillaryMasters();
                    this.currentProviderId = 0;
                },
                (error) => {
                    let errString = 'Unable to assign Provider.';
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
                        result = this._ancillaryMasterStore.deleteMedicalProvider(CurrentProvider);
                        result.subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Medical Provider deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()
                                });
                                this.loadAllAncillaries();
                                this.loadAncillaryMasters();
                                this._notificationsStore.addNotification(notification);
                                this.selectedProviders = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete Medical Provider';
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

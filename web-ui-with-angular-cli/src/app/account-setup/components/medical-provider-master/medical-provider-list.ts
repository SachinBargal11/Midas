import { Component, OnInit } from '@angular/core';
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
import { MedicalProviderMasterStore } from '../../stores/medical-provider-master-store';
import { MedicalProviderMaster } from '../../models/medical-provider-master';

import { Location } from '../../../medical-provider/locations/models/location';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import * as _ from 'underscore';
@Component({
    selector: 'medical-provider-list',
    templateUrl: './medical-provider-list.html'
})

export class MedicalProviderListComponent implements OnInit {
    currentProviderId: number = 0;
    selectedProviders: MedicalProviderMaster[] = [];
    providers: MedicalProviderMaster[];
    allProviders: MedicalProviderMaster[];
    datasource: MedicalProviderMaster[];
    totalRecords: number;
    companyId: number;
    patientId: number;
    isDeleteProgress: boolean = false;
    locations: LocationDetails[];

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _medicalProviderMasterStore: MedicalProviderMasterStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private confirmationService: ConfirmationService,
        public locationsStore: LocationsStore,
    ) {

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadAllProviders();
        });

    }
    ngOnInit() {
        this.loadAllProviders();
        // this.loadMedicalProviders();
    }
    loadAllProviders() {
        // this.locationsStore.getAllLocationAndTheirCompany()
        //     .subscribe((locations) => {
        //         this.locations = locations;
        //     });

        this._progressBarService.show();
        this._medicalProviderMasterStore.getAllProviders()
            .subscribe((allProviders: MedicalProviderMaster[]) => {
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

    deleteMedicalProviders() {
        if (this.selectProviders.length > 0) {

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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InsuranceStore } from '../stores/insurance-store';
import { Insurance } from '../models/insurance';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';

@Component({
    selector: 'insurance-list',
    templateUrl: './insurance-list.html'
})

export class InsuranceListComponent implements OnInit {
    selectedInsurances: Insurance[] = [];
    insurances: Insurance[];
    patientId: number;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _insuranceStore: InsuranceStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId);
        });
    }

    ngOnInit() {
        this.loadInsurances();
    }

    loadInsurances() {
        this._progressBarService.show();
        this._insuranceStore.getInsurances(this.patientId)
            .subscribe(insurances => {
                this.insurances = insurances;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    deleteInsurance() {
        if (this.selectedInsurances.length > 0) {
            this.selectedInsurances.forEach(currentInsurance => {
                this._progressBarService.show();
                let result;
                result = this._insuranceStore.deleteInsurance(currentInsurance);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Insurance deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadInsurances();
                        this._notificationsStore.addNotification(notification);
                        this.selectedInsurances = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete Insurance';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedInsurances = [];
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
                'title': 'select Insurance to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select Insurance to delete');
        }
    }

}
import * as moment from 'moment';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SpecialityDetailsStore } from '../../stores/speciality-details-store';
import { SpecialityDetail } from '../../models/speciality-details';

import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';


@Component({
    selector: 'speciality-details',
    templateUrl: './speciality-details.html'
})

export class SpecialityDetailComponent {
    selectedSpecialityDetails: SpecialityDetail[];
    specialityDetails: SpecialityDetail[];

    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private _notificationsStore: NotificationsStore,
        public _specialityDetailsStore: SpecialityDetailsStore,
        private _notificationsService: NotificationsService,
        private _progressBarService: ProgressBarService
    ) {
    }
    ngOnInit() {
        this.loadSpecialityDetails();
    }
    loadSpecialityDetails() {
        this._progressBarService.show();
        this._route.parent.params.subscribe((params: any) => {
            let specialityId: number = parseInt(params.id);
            let requestData = {
                specialty: {
                    id: specialityId
                }
            };
            let result = this._specialityDetailsStore.getSpecialityDetails(requestData);
            result.subscribe(
                (specialityDetails: SpecialityDetail[]) => {
                    this.specialityDetails = specialityDetails;
                },
                (error) => {
                    this._router.navigate(['/account-setup/specialities']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
    }

    deleteSpecialityDetails() {
        if (this.selectedSpecialityDetails !== undefined) {
            this.selectedSpecialityDetails.forEach(currentSpecialityDetail => {
                this._progressBarService.show();
                let result;

                result = this._specialityDetailsStore.deleteSpecialityDetail(currentSpecialityDetail);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Speciality Detail deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadSpecialityDetails();
                        this._notificationsStore.addNotification(notification);
                        this.selectedSpecialityDetails = undefined;
                    },
                    (error) => {
                        let errString = 'Unable to delete Speciality Detail!';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
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
                'title': 'select speciality details to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select speciality details to delete');
        }
    }

}
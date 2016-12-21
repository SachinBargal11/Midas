import moment from 'moment';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpecialityDetailsStore } from '../../../../stores/speciality-details-store';
import { SpecialityDetail } from '../../../../models/speciality-details';

import { NotificationsStore } from '../../../../stores/notifications-store';
import { Notification } from '../../../../models/notification';


@Component({
    selector: 'speciality-details',
    templateUrl: 'templates/pages/account-setup/speciality-details/speciality-details.html',
})

export class SpecialityDetailComponent {
    selectedSpecialityDetails: SpecialityDetail[];
    specialityDetails: SpecialityDetail[];
    specialityDetailsLoading;
    isDeleteProgress = false;

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
        public _specialityDetailsStore: SpecialityDetailsStore
    ) {
        this.specialityDetailsLoading = true;
        this._route.parent.params.subscribe((params: any) => {
            let specialityId: number = parseInt(params.id);
            let requestData = {
                speciality: {
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
                },
                () => {
                    this.specialityDetailsLoading = false;
                });
        });
    }
    ngOnInit() {
    }

    deleteSpecialityDetails() {
        if (this.selectedSpecialityDetails !== undefined) {
            this.selectedSpecialityDetails.forEach(specialityDetail => {
                let selectedSpecialityDetail = new SpecialityDetail({
                    id: specialityDetail.id,
                    isDeleted: 1
                });
                this.isDeleteProgress = true;
                let result;

                result = this._specialityDetailsStore.deleteSpecialityDetail(selectedSpecialityDetail);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Speciality Detail deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.specialityDetails.splice(this.specialityDetails.indexOf(specialityDetail), 1);
                        this._notificationsStore.addNotification(notification);
                    },
                    (error) => {
                        let notification = new Notification({
                            'title': 'Unable to delete Speciality Detail!',
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                    },
                    () => {
                        this.isDeleteProgress = false;
                    });
            });
        }
        else {
            let notification = new Notification({
                'title': 'select speciality details to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
        }
    }

}
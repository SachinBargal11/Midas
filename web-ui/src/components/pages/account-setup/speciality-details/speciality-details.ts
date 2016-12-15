import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';
import { Component, ViewChild } from '@angular/core';
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
    specialityDetails: SpecialityDetail[];
    specialityDetailsLoading;

    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        public _specialityDetailsStore: SpecialityDetailsStore
    ) {
        this.specialityDetailsLoading = true;
        this._route.parent.params.subscribe((params: any) => {
            let specialityId: number = parseInt(params.id);
            let requestData = {
                speciality: {
                    id: specialityId
                }
            }
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
        // this.loadSpecialityDetails();
    }


    loadSpecialityDetails() {
        this._specialityDetailsStore.getSpecialityDetails()
            .subscribe(specialityDetails => { this.specialityDetails = specialityDetails; },
            null,
            () => { });
    }

}
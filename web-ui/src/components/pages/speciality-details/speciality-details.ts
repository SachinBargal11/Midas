import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import moment from 'moment';
import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SpecialityDetailsStore} from '../../../stores/speciality-details-store';
import {SpecialityDetail} from '../../../models/speciality-details';

import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';


@Component({
    selector: 'speciality-details',
    templateUrl: 'templates/pages/speciality-details/speciality-details.html',
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
        public _router: Router,
        public _specialityDetailsStore: SpecialityDetailsStore
    ) {
        
    }
    ngOnInit() {
        this.loadSpecialityDetails();
    }


    loadSpecialityDetails() {
        this.specialityDetailsLoading = true;
        this._specialityDetailsStore.getSpecialityDetails()
            .subscribe(specialityDetails => { this.specialityDetails = specialityDetails; },
            null,
            () => { this.specialityDetailsLoading = false; });
    }

}
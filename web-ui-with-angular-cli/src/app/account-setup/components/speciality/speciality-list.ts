import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//
import { SpecialityDetail } from '../../models/speciality-details';
//
import { SpecialityStore } from '../../stores/speciality-store';
import { Speciality } from '../../models/speciality';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { SpecialityDetailsStore } from '../../stores/speciality-details-store';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'speciality-list',
    templateUrl: './speciality-list.html'
})


export class SpecialityListComponent implements OnInit {
    specialities: Speciality[];
    // specialityDetails: SpecialityDetail[];
    specialityDetail: any;

    constructor(
        private _router: Router,
        private _specialityStore: SpecialityStore,
        private _progressBarService: ProgressBarService,
        public _sessionStore: SessionStore,
        private _specialityDetailsStore: SpecialityDetailsStore
    ) {

    }

    ngOnInit() {
        this.loadSpeciality();
    }

    loadSpeciality() {
        this._progressBarService.show();
        this._specialityStore.getSpecialities()
            .subscribe(specialities => { this.specialities = specialities; },
            null,
            () => { this._progressBarService.hide(); });
    }


    loadAddEditSpeciality(speciality) {
        let requestData = {
            company: {
                id: this._sessionStore.session.currentCompany.id
            },
            specialty: {
                id: speciality.id
            }
        };
        let result = this._specialityDetailsStore.getSpecialityDetails(requestData);
        result.subscribe(
            (specialityDetails) => {
                this.specialityDetail = specialityDetails;
                // if (this.specialityDetails.length > 0) {
                if (this.specialityDetail.id !== undefined) {
                    this._router.navigate(['/account-setup/specialities/' + speciality.id + '/edit/' + this.specialityDetail.id]);
                } else {
                    this._router.navigate(['/account-setup/specialities/' + speciality.id + '/add']);

                }
            },
            (error) => {
                this._router.navigate(['/account-setup/specialities']);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });


    }
}
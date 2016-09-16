import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MedicalFacilityService} from '../../../services/medical-facility-service';
import {SessionStore} from '../../../stores/session-store';
import {MedicalFacilityDetail} from '../../../models/medical-facility-details';

@Component({
    selector: 'medical-facilities-list',
    templateUrl: 'templates/pages/medical-facilities/medical-facilities-list.html'
})


export class MedicalFacilitiesListComponent implements OnInit {
    medicalfacilities: MedicalFacilityDetail[];
    medicalfacilitiesLoading;
    constructor(
        private _router: Router,
        private _sessionStore: SessionStore,
        private _medicalFacilityService: MedicalFacilityService
    ) {
    }

    ngOnInit() {
        this.loadMedicalFacility();
    }
    loadMedicalFacility() {
        this.medicalfacilitiesLoading = true;
        let accountId = this._sessionStore.session.account_id;
        let medicalfacility = this._medicalFacilityService.getMedicalFacilities(accountId)
            .subscribe(medicalfacilities => { this.medicalfacilities = medicalfacilities; },
            null,
            () => { this.medicalfacilitiesLoading = false; });
        return medicalfacility;
    }
}
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MedicalFacilityStore} from '../../../stores/medical-facilities-store';
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
        private _medicalFacilityStore: MedicalFacilityStore
    ) {
    }

    ngOnInit() {
        this.loadMedicalFacility();
    }

    loadMedicalFacility() {
        this.medicalfacilitiesLoading = true;
        let medicalfacility = this._medicalFacilityStore.getMedicalFacilities()
            .subscribe(medicalfacilities => { this.medicalfacilities = medicalfacilities; },
            null,
            () => { this.medicalfacilitiesLoading = false; });
        return medicalfacility;
    }
}
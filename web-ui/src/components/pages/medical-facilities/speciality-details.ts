import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {MedicalFacilityService} from '../../../services/medical-facility-service';
import {MedicalFacilityStore} from '../../../stores/medical-facilities-store';
import {SessionStore} from '../../../stores/session-store';
import {SpecialityDetail} from '../../../models/speciality-details';
import {MedicalFacilityDetail} from '../../../models/medical-facility-details';
import {MapToJSPipe} from '../../../pipes/map-to-js';
import {SpecialityDetailFormComponent} from './speciality-detail-form';

@Component({
    selector: 'speciality-details',
    templateUrl: 'templates/pages/medical-facilities/speciality-details.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: [MapToJSPipe]
})

export class SpecialityDetailsComponent {
    medicalFacilityDetail: MedicalFacilityDetail;
    get specialityDetails(): Array<SpecialityDetail> {
        return this.medicalFacilityDetail ? this.medicalFacilityDetail.specialityDetails : null;
    }
    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private _medicalFacilityService: MedicalFacilityService,
        private _medicalFacilityStore: MedicalFacilityStore
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let medicalFacilityId: number = parseInt(routeParams.id);
            let result = this._medicalFacilityStore.fetchMedicalFacilityById(medicalFacilityId);
            result.subscribe(
                (medicalFacilityDetail: MedicalFacilityDetail) => {
                    this.medicalFacilityDetail = medicalFacilityDetail;
                },
                (error) => {
                    this._router.navigate(['/medical-facilities']);
                },
                () => {
                });
        });
    }
}
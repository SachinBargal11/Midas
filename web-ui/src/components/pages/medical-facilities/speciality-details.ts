import {Record, List} from 'immutable';
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import {MedicalFacilityService} from '../../../services/medical-facility-service';
import {MedicalFacilityStore} from '../../../stores/medical-facilities-store';
import {SessionStore} from '../../../stores/session-store';
import {SpecialityDetail} from '../../../models/speciality-details';
import {MedicalFacilityDetail} from '../../../models/medical-facility-details';
import {MapToJSPipe} from '../../../pipes/map-to-js';
import {SpecialityDetailFormComponent} from './speciality-detail-form';
import {AddSpecialityDetailComponent} from './add-speciality-details';

@Component({
    selector: 'speciality-details',
    templateUrl: 'templates/pages/medical-facilities/speciality-details.html',
    directives: [ROUTER_DIRECTIVES, ModalDirective],
    pipes: [MapToJSPipe]
})

export class SpecialityDetailsComponent {
    medicalFacilityDetail: MedicalFacilityDetail;
    @ViewChild('childModal') public childModal: ModalDirective;
    get specialityDetails(): List<SpecialityDetail> {
        return this.medicalFacilityDetail ? this.medicalFacilityDetail.specialityDetails.getValue() : null;
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

    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }
}
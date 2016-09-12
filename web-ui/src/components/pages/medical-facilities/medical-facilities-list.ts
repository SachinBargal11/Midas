import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {MedicalFacilityService} from '../../../services/medical-facility-service';
import {ReversePipe} from '../../../pipes/reverse-array-pipe';
import {LimitPipe} from '../../../pipes/limit-array-pipe';
import {DataTable} from 'primeng/primeng';
import {SessionStore} from '../../../stores/session-store';
import {MedicalFacilityDetail} from '../../../models/medical-facility-details';

@Component({
    selector: 'medical-facilities-list',
    templateUrl: 'templates/pages/medical-facilities/medical-facilities-list.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    pipes: [ReversePipe, LimitPipe]
})


export class MedicalFacilitiesListComponent implements OnInit {
medicalfacilities: MedicalFacilityDetail[];
    constructor(
        private _router: Router,
        private _sessionStore: SessionStore,
        private _medicalFacilityService: MedicalFacilityService
    ) {
    }

    ngOnInit() {
        let accountId = this._sessionStore.session.account_id;
         let medicalfacility = this._medicalFacilityService.getMedicalFacilities(accountId)
                                .subscribe(medicalfacilities => this.medicalfacilities = medicalfacilities);
    }
}
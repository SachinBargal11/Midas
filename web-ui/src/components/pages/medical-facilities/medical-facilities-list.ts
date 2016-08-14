import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {MedicalFacilityStore} from '../../../stores/medical-facilities-store';
import {MedicalFacilityService} from '../../../services/medical-facility-service';
import {ReversePipe} from '../../../pipes/reverse-array-pipe';
import {LimitPipe} from '../../../pipes/limit-array-pipe';

@Component({
    selector: 'medical-facilities-list',
    templateUrl: 'templates/pages/medical-facilities/medical-facilities-list.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    pipes: [ReversePipe, LimitPipe]
})


export class MedicalFacilitiesListComponent implements OnInit {

    constructor(
        private _router: Router,
        private _medicalFacilityStore: MedicalFacilityStore
    ) {
    }

    ngOnInit() {

    }

}
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientsStore} from '../stores/patients-store';

@Component({
    selector: 'patient-details',
    templateUrl: './patient-details.html',
})

export class PatientDetailsComponent {

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private _patientsStore: PatientsStore
    ) {


    }
}
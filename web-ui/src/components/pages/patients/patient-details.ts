import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../../../models/patient';
import {PatientsStore} from '../../../stores/patients-store';
import {PatientProfileComponent} from './profile-patient';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'patient-details',
    templateUrl: 'templates/pages/patients/patient-details.html',
})

export class PatientDetailsComponent {

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private _patientsStore: PatientsStore
    ) {


    }
}
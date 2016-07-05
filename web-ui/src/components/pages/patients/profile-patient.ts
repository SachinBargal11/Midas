import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from '@angular/router-deprecated';
import {Patient} from '../../../models/patient'
import {PatientsStore} from '../../../stores/patients-store';

@Component({
    selector: 'profile-patient',
    templateUrl: 'templates/pages/patients/profile-patient.html',
    directives: [ROUTER_DIRECTIVES]
})

export class PatientProfileComponent {
    patient: Patient;
    constructor(
        public router: Router,
        private _routeParams: RouteParams,
        private _patientsStore: PatientsStore
    ) {
        this.patient = this._patientsStore.currentPatient;
    }
    
}
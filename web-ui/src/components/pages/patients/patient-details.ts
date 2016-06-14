import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from '@angular/router-deprecated';
import {Patient} from '../../../models/patient'
import {PatientsStore} from '../../../stores/patients-store';
import {PatientProfileComponent} from './profile-patient';

// @RouteConfig([
//     { path: '/', name: 'PatientProfile', component: PatientProfileComponent }
// ])

@Component({
    selector: 'patient-details',
    templateUrl: 'templates/pages/patients/patient-details.html',
    directives: [ROUTER_DIRECTIVES],
})

export class PatientDetailsComponent {
    
    patient: Patient;

    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _patientsStore: PatientsStore
    ) {
        let patientId: number = parseInt(this._routeParams.get('id'));
        let patient = this._patientsStore.findPatientById(patientId);
        if(patient)
        {
            this._patientsStore.selectPatient(patient);            
            this.patient = patient;
        }
        else
        {
            this._router.navigate(['PatientsList']);
        }
    }
}
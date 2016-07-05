import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from '@angular/router-deprecated';
import {Patient} from '../../../models/patient'
import {PatientsStore} from '../../../stores/patients-store';
import {PatientProfileComponent} from './profile-patient';

@RouteConfig([
    { path: '/', name: 'PatientProfile', component: PatientProfileComponent, useAsDefault: true }
])

@Component({
    selector: 'patient-details',
    templateUrl: 'templates/pages/patients/patient-details.html',
    directives: [ROUTER_DIRECTIVES],
})

export class PatientDetailsComponent {

    patient: Patient;

    constructor(
        public router: Router,
        private _routeParams: RouteParams,
        private _patientsStore: PatientsStore
    ) {
        let patientId: number = parseInt(this._routeParams.get('id'));
        let patient = this._patientsStore.findPatientById(patientId);
        if (patient) {
            this._patientsStore.selectPatient(patient);
            this.patient = patient;
        }
        else {
            this.router.navigate(['PatientsList']);
        }
    }
    
    isCurrentRoute(route) {
        var instruction = this.router.generate(route);
        return this.router.isRouteActive(instruction);
    }
}
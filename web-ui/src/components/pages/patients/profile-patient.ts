import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Patient} from '../../../models/patient';
import {PatientsStore} from '../../../stores/patients-store';

@Component({
    selector: 'profile-patient',
    templateUrl: 'templates/pages/patients/profile-patient.html'
})

export class PatientProfileComponent {
    patient: Patient;
    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private _patientsStore: PatientsStore
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let patientId: number = parseInt(routeParams.id);
            let result = this._patientsStore.fetchPatientById(patientId);
            result.subscribe(
                (patient: Patient) => {
                    this._patientsStore.selectPatient(patient);
                    this.patient = patient;
                },
                (error) => {
                    this._router.navigate(['/patients']);
                },
                () => {
                });
        });

    }

}
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PatientsStore} from '../../../stores/patients-store';
import { Patient } from '../../../models/patient';

@Component({
    selector: 'patients-list',
    templateUrl: 'templates/pages/patients/patients-list.html'
})

export class PatientsListComponent implements OnInit {
    selectedPatients: Patient[];
    patients: Patient[];
    patientsLoading;

    constructor(
        private _router: Router,
        private _patientsStore: PatientsStore
    ) {
    }

    ngOnInit() {
        this.loadPatients();
    }

    loadPatients() {
        this.patientsLoading = true;
        this._patientsStore.getPatients()
            .subscribe(patients => {
                this.patients = patients;
            },
            null,
            () => {
                this.patientsLoading = false;
            });
    }
    onRowSelect(patient) {
        this._router.navigate(['/patientManager/patients/' + patient.firstname + '/basic']);
    }
}
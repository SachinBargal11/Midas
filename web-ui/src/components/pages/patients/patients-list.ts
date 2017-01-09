import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsStore } from '../../../stores/patients-store';
import { Patient } from '../../../models/patient';
import { ProgressBarService } from '../../../services/progress-bar-service';

@Component({
    selector: 'patients-list',
    templateUrl: 'templates/pages/patients/patients-list.html'
})

export class PatientsListComponent implements OnInit {
    selectedPatients: Patient[];
    patients: Patient[];

    constructor(
        private _router: Router,
        private _patientsStore: PatientsStore,
        private _progressBarService: ProgressBarService
    ) {
    }

    ngOnInit() {
        this.loadPatients();
    }

    loadPatients() {
        this._progressBarService.start();
        this._patientsStore.getPatients()
            .subscribe(patients => {
                this.patients = patients;
            },
            (error) => {
                this._progressBarService.stop();
            },
            () => {
                this._progressBarService.stop();
            });
    }
    onRowSelect(patient) {
        this._router.navigate(['/patient-manager/patients/' + patient.firstname + '/basic']);
    }
}
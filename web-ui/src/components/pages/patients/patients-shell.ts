import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PatientsStore} from '../../../stores/patients-store';
import {Observable} from 'rxjs/Observable';
import {Patient} from '../../../models/patient';
import {PatientsListComponent} from './patients-list';
import {PatientDetailsComponent} from './patient-details';
import {AddPatientComponent} from './add-patient';

@Component({
    selector: 'patients-shell',
    templateUrl: 'templates/pages/patients/patients-shell.html'
})

export class PatientsShellComponent implements OnInit {

    constructor(
        public router: Router,
        private _patientsStore: PatientsStore
    ) {

    }

    ngOnInit() {

    }

    deselectPatient(event, patient: Patient) {
        event.stopPropagation();
        event.preventDefault();
        this._patientsStore.deselectPatient(patient);
        this.router.navigate(['/patients']);
    }

}
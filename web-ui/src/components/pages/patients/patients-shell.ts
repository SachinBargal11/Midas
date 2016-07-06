import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {PatientsStore} from '../../../stores/patients-store';
import {Observable} from 'rxjs/Observable';
import {Patient} from '../../../models/patient';


@Component({
    selector: 'patients-shell',
    templateUrl: 'templates/pages/patients/patients-shell.html',
    directives: [ROUTER_DIRECTIVES]
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
        this.router.navigate(['PatientsList']);
    }

}
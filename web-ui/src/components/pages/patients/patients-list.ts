import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {PatientsStore} from '../../../stores/patients-store';
import {List} from 'immutable';
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {Patient} from '../../../models/patient';

@Component({
    selector: 'patients-list',
    templateUrl: 'templates/pages/patients/patients-list.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class PatientsListComponent implements OnInit {

    constructor(
        private _router: Router,
        private _patientsStore: PatientsStore
    ) {
    }

    ngOnInit() {

    }

    selectPatients(patient) {
        this._patientsStore.selectPatient(patient);
        this._router.navigate(['/patients/' + patient.id + '/profile']);
    }
}
import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from '@angular/router-deprecated';
import {PatientsStore} from '../../../stores/patients-store';
import {List} from 'immutable';
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {Patient} from '../../../models/patient';

@Component({
    selector: 'patients-list',
    templateUrl: 'templates/pages/patients/patients-list.html',
    directives: [ROUTER_DIRECTIVES],
    styles: [

    ]
})

export class PatientsListComponent implements OnInit {

    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _patientsStore: PatientsStore
    ) {
        console.log(this._patientsStore.patients);

    }

    ngOnInit() {

    }

    selectPatients(patient) {
        this._patientsStore.selectPatient(patient);
    }
}
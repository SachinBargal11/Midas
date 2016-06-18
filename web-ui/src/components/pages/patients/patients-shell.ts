import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from '@angular/router-deprecated';
import _ from 'underscore';

import {PatientsListComponent} from './patients-list';
import {PatientDetailsComponent} from './patient-details';
import {AddPatientComponent} from './add-patient';

import {PatientsStore} from '../../../stores/patients-store';

import {Observable} from 'rxjs/Observable';
import {Patient} from '../../../models/patient';


@Component({
    selector: 'patients-shell',
    templateUrl: 'templates/pages/patients/patients-shell.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', name: 'PatientsList', component: PatientsListComponent, useAsDefault: true },
    { path: '/:id/...', name: 'PatientDetails', component: PatientDetailsComponent },
    { path: '/add', name: 'AddPatient', component: AddPatientComponent }
])

export class PatientsShellComponent implements OnInit {
    
    constructor(
        public router: Router,
        private _routeParams: RouteParams,
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

    isCurrentRoute(route) {
        var instruction = this.router.generate(route);
        return this.router.isRouteActive(instruction);
    }
}
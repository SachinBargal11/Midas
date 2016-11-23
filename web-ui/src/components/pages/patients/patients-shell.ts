import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PatientsStore} from '../../../stores/patients-store';
import {Patient} from '../../../models/patient';

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

}
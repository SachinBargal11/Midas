import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PatientsStore} from '../../../stores/patients-store';

@Component({
    selector: 'patients-manager-shell',
    templateUrl: 'templates/pages/patients/patients-manager-shell.html'
})

export class PatientsManagerShellComponent implements OnInit {

    constructor(
        public router: Router,
        private _patientsStore: PatientsStore
    ) {

    }

    ngOnInit() {

    }

}
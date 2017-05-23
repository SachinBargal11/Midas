import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PatientsStore} from './patients/stores/patients-store';

@Component({
    selector: 'patients-manager-shell',
    templateUrl: './patients-manager-shell.html'
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
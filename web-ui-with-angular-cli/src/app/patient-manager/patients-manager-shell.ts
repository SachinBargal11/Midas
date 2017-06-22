import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PatientsStore} from './patients/stores/patients-store';
import { SessionStore } from '../commons/stores/session-store';

@Component({
    selector: 'patients-manager-shell',
    templateUrl: './patients-manager-shell.html'
})

export class PatientsManagerShellComponent implements OnInit {

    constructor(
        public router: Router,
        public sessionStore: SessionStore,
        private _patientsStore: PatientsStore
    ) {

    }

    ngOnInit() {

    }

}
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// import {PatientsStore} from '../stores/patients-store';

@Component({
    selector: 'add-case-shell',
    templateUrl: './add-case-shell.html'
})

export class AddCaseShellComponent implements OnInit {

    constructor(
        public router: Router,
        // private _patientsStore: PatientsStore
    ) {

    }

    ngOnInit() {

    }

}
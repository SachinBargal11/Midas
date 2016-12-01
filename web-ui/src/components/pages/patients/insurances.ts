import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';

@Component({
    selector: 'insurances',
    templateUrl: 'templates/pages/patients/insurances.html'
})


export class InsurancesComponent implements OnInit {
    constructor(
        private _router: Router,
        private _sessionStore: SessionStore
    ) {
    }
    ngOnInit() {
    }
}
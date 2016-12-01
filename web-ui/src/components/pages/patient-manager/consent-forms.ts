import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';

@Component({
    selector: 'consent-forms',
    templateUrl: 'templates/pages/patient-manager/consent-forms.html'
})


export class ConsentFormsComponent implements OnInit {
    constructor(
        private _router: Router,
        private _sessionStore: SessionStore
    ) {
    }
    ngOnInit() {
    }
}
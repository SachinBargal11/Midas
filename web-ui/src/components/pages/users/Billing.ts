import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';

@Component({
    selector: 'billing',
    templateUrl: 'templates/pages/users/billing.html'
})


export class BillingComponent implements OnInit {
    constructor(
        private _router: Router,
        private _sessionStore: SessionStore
    ) {
    }
    ngOnInit() {
    }
}
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';

@Component({
    selector: 'account-setup-shell',
    templateUrl: 'templates/pages/account-setup/account-setup-shell.html'
})

export class AccountSetupShellComponent implements OnInit {

    constructor(
        public router: Router,
        private _sessionStore: SessionStore
    ) {

    }

    ngOnInit() {

    }

}
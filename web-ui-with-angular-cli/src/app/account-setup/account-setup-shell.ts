import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from '../commons/stores/session-store';

@Component({
    selector: 'account-setup-shell',
    templateUrl: './account-setup-shell.html'
})

export class AccountSetupShellComponent implements OnInit {

    constructor(
        public _router: Router,
        private _sessionStore: SessionStore
    ) {
         this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/account-setup/specialities']); ;
        });

    }

    ngOnInit() {

    }

}
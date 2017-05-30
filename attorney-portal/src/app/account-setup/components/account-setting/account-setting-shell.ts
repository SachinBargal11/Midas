import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'account-setting-shell',
    templateUrl: './account-setting-shell.html'
})

export class AccountSettingShellComponent implements OnInit {

    constructor(
        public _router: Router,
        public _sessionStore: SessionStore
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/account-setup/account-setting/document-types']);;
        });
    }

    ngOnInit() {

    }

}
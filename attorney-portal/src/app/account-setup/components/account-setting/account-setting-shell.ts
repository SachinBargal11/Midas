import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { UserSettingStore } from '../../../commons/stores/user-setting-store';
import { UserSetting } from '../../../commons/models/user-setting';

@Component({
    selector: 'account-setting-shell',
    templateUrl: './account-setting-shell.html',
    styleUrls: ['../../../accordion.scss']
})

export class AccountSettingShellComponent implements OnInit {
    userSetting: UserSetting;
    preferredUIViewId: number;
    currAccordion;

    constructor(
        public _router: Router,
        public _sessionStore: SessionStore,
        private _userSettingStore: UserSettingStore
    ) {
        let href = window.location.href;
        this.currAccordion = href.substr(href.lastIndexOf('/') + 1);

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/account-setup/account-setting/general-settings']);;
        });
    }

    ngOnInit() {
        this._userSettingStore.getUserSettingByUserId(this._sessionStore.session.user.id, this._sessionStore.session.currentCompany.id)
            .subscribe((userSetting) => {
                this.userSetting = userSetting;
                this.preferredUIViewId = userSetting.preferredUIViewId;
            });
    }
    setContent() {
        // let value = e.target.value;
        this.currAccordion;
    }
}
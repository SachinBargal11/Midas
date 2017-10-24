import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { UserSettingStore } from '../../../commons/stores/user-setting-store';
import { UserSetting } from '../../../commons/models/user-setting';

@Component({
    selector: 'referrals-shell',
    templateUrl: './referrals-shell.html',
    styleUrls: ['../../../accordion.scss']
})

export class ReferralsShellComponent implements OnInit {
    userSetting: UserSetting;
    preferredUIViewId: number;
    currAccordion;

    constructor(
        public _router: Router,
        public sessionStore: SessionStore,
        private _userSettingStore: UserSettingStore
    ) {
        let href = window.location.href;
        this.currAccordion = href.substr(href.lastIndexOf('/') + 1);

    }

    ngOnInit() {
        this._userSettingStore.getUserSettingByUserId(this.sessionStore.session.user.id, this.sessionStore.session.currentCompany.id)
            .subscribe((userSetting) => {
                this.userSetting = userSetting;
                this.preferredUIViewId = userSetting.preferredUIViewId;
            })

    }
    setContent(elem) {
        if(this.currAccordion == elem) {
            this.currAccordion = '';
        }
    }

}
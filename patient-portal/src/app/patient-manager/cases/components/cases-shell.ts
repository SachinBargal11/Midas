import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSetting } from '../../../commons/models/user-setting';
import { UserSettingStore } from '../../../commons/stores/user-setting-store';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'cases-shell',
    templateUrl: './cases-shell.html',
    styleUrls: ['../../../accordion.scss']
})

export class CaseShellComponent implements OnInit {

    currAccordion;
    currAccordion1;
    currAccordion2;
    currAccordion3;
    index: number;
    routerLink: string;
    userSetting: UserSetting;
    preferredUIViewId:number;
    userId: number = this.sessionStore.session.user.id;

    constructor(
        public router: Router,
        private _userSettingStore: UserSettingStore,
                public sessionStore: SessionStore,

    ) {
        let href = window.location.href;
        this.currAccordion = href.substr(href.lastIndexOf('/') + 1);

    }

    ngOnInit() {
        this._userSettingStore.getPatientPersonalSettingByPatientId(this.userId)
            .subscribe((userSetting) => {
                this.userSetting = userSetting;
                this.preferredUIViewId = userSetting.preferredUIViewId;
            }
            )
    }
    onTabOpen(e) {
        this.index = e.index;
    }

    setContent() {
        // let value = e.target.value;
        this.currAccordion;
        // this.currAccordion1;
        // this.currAccordion2;
        // this.currAccordion3;
    }


}
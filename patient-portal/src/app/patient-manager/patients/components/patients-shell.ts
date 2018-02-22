import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsStore } from '../stores/patients-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { UserSettingStore } from '../../../commons/stores/user-setting-store';
import { UserSetting } from '../../../commons/models/user-setting';

@Component({
    selector: 'patients-shell',
    templateUrl: './patients-shell.html',
    styleUrls: ['../../../accordion.scss']
})

export class PatientsShellComponent implements OnInit {

    userSetting: UserSetting;
    preferredUIViewId: number;
    currAccordion;
    userId: number = this.sessionStore.session.user.id;

    constructor(
        public _router: Router,
        private _patientsStore: PatientsStore,
        public sessionStore: SessionStore,
        private _userSettingStore: UserSettingStore,
        private _sessionStore: SessionStore,
    ) {
        let href = window.location.href;
        this.currAccordion = href.substr(href.lastIndexOf('/') + 1);
    }

    ngOnInit() {
        this._userSettingStore.getPatientPersonalSettingByPatientId(this.userId)
            .subscribe((userSetting) => {
                this.userSetting = userSetting;
                this.preferredUIViewId = userSetting.preferredUIViewId;
            });
    }
    setContent(elem) {
        if (this.currAccordion == elem) {
            this.currAccordion = '';
        }
    }

}
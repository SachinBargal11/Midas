import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../commons/stores/session-store';
import { UserSettingStore } from '../../commons/stores/user-setting-store';
import { UserSetting } from '../../commons/models/user-setting';

@Component({
    selector: 'user-settings-shell',
    templateUrl: './user-settings-shell.html',
    styleUrls: ['../../accordion.scss']
})

export class UserSettingsShellComponent implements OnInit {
    userSetting: UserSetting;
    preferredUIViewId: number;
    currAccordion;
    test: boolean = true;
    userId: number = this.sessionStore.session.user.id;

    constructor(

        public _router: Router,
        public _route: ActivatedRoute,
        private _sessionStore: SessionStore,
        private _userSettingStore: UserSettingStore,
        public sessionStore: SessionStore,

    ) {
        let href = window.location.href;
        this.currAccordion = href.substr(href.lastIndexOf('/') + 1);
        //    this._sessionStore.userCompanyChangeEvent.subscribe(() => {
        //         this._router.navigate(['/dashboard']);
        //     });
    }

    ngOnInit() {
        this._userSettingStore.getPatientPersonalSettingByPatientId(this.userId)
            .subscribe((userSetting) => {
                this.userSetting = userSetting;
                this.preferredUIViewId = userSetting.preferredUIViewId;
            });
        this._route.params.subscribe((routeParams: any) => {
            console.log(routeParams);
        });
    }
    setContent(elem) {
        if (this.currAccordion == elem) {
            this.currAccordion = '';
        }
    }
}
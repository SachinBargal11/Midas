import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { UsersStore } from '../stores/users-store';
import { User } from '../../../commons/models/user';
import * as _ from 'underscore';
import { UserSetting } from '../../../commons/models/user-setting';
import { UserSettingStore } from '../../../commons/stores/user-setting-store';

@Component({
    selector: 'user-shell',
    templateUrl: './users-shell.html',
    styleUrls: ['../../../accordion.scss']
})

export class UserShellComponent implements OnInit {
    user: User;
    userRoleFlag: number;
    role;
    roleType;
    userSetting: UserSetting;
    preferredUIViewId: number;
    currAccordion;
    currAccordion1;
    currAccordion2;
    currAccordion3;
    index: number;
    routerLink: string;

    constructor(
        public _router: Router,
        public _route: ActivatedRoute,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore,
        public sessionStore: SessionStore,
        private _userSettingStore: UserSettingStore
    ) {

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/medical-provider/users']);
        });
        let href = window.location.href;
        this.currAccordion = href.substr(href.lastIndexOf('/') + 1);
        this._route.params.subscribe((routeParams: any) => {
            let userId: number = parseInt(routeParams.userId);
            this.userRoleFlag = parseInt(routeParams.userRoleFlag);
            let result = this._usersStore.fetchUserById(userId);
            result.subscribe(
                (userDetail: User) => {
                    this.user = userDetail;
                    this.role = _.map(this.user.roles, (currentRole: any) => {
                        return currentRole.roleType;
                    });
                    this.role.forEach(roleType => {
                        if (roleType === 3) {
                            this.roleType = roleType;
                        }
                    });
                    if (this.roleType !== 3) {
                        // document.getElementById('doctorInfo').style.display = 'none';
                        document.getElementById('doctorLocation').style.display = 'none';
                    }
                },
                (error) => {
                    this._router.navigate(['/medical-provider/users']);
                },
                () => {
                });
        });
        // if (this.userRoleFlag === 2) {
        //     document.getElementById('doctorLocation').style.display = 'block';
        // }
    }

    ngOnInit() {
        this._userSettingStore.getUserSettingByUserId(this.sessionStore.session.user.id, this.sessionStore.session.currentCompany.id)
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
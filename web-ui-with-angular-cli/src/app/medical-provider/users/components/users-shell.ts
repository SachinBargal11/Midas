import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { UsersStore } from '../stores/users-store';
import { User } from '../../../commons/models/user';
import * as _ from 'underscore';

@Component({
    selector: 'user-shell',
    templateUrl: './users-shell.html'
})

export class UserShellComponent implements OnInit {
    user: User;
    userRoleFlag: number;
    role;
    roleType;

    constructor(
        public _router: Router,
        public _route: ActivatedRoute,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore
    ) {
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

        }

    }
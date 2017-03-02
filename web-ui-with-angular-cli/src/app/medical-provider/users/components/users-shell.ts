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
    role;

    constructor(
        public _router: Router,
        public _route: ActivatedRoute,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let userId: number = parseInt(routeParams.userId);
            let result = this._usersStore.fetchUserById(userId);
            result.subscribe(
                (userDetail: User) => {
                    this.user = userDetail;
                    this.role = _.map(this.user.roles, (currentRole: any) => {
                            return currentRole;
                    });
                },
                (error) => {
                    this._router.navigate(['/medical-provider/users']);
                },
                () => {
                });
        });

    }

    ngOnInit() {

    }

}
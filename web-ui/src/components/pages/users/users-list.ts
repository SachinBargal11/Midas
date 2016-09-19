import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';
import {UsersStore} from '../../../stores/users-store';
import {AccountDetail} from '../../../models/account-details';

@Component({
    selector: 'users-list',
    templateUrl: 'templates/pages/users/users-list.html'
})


export class UsersListComponent implements OnInit {
    users: AccountDetail[];
    usersLoading;
    cols: any[];
    constructor(
        private _router: Router,
        private _usersStore: UsersStore,
        private _sessionStore: SessionStore
    ) {
    }
    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.usersLoading = true;
        this._usersStore.getUsers()
            .subscribe(users => {
                this.users = users;
            },
            null,
            () => {
                this.usersLoading = false;
            });
    }
}
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';
import {UsersService} from '../../../services/users-service';
import {AccountDetail} from '../../../models/account-details';

@Component({
    selector: 'users-list',
    templateUrl: 'templates/pages/users/users-list.html',
    providers: [UsersService]
})


export class UsersListComponent implements OnInit {
    users: AccountDetail[];
    usersLoading;
    cols: any[];
    constructor(
        private _router: Router,
        private _usersService: UsersService,
        private _sessionStore: SessionStore
    ) {
    }
    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.usersLoading = true;
        let accountId = this._sessionStore.session.account_id;
        let user = this._usersService.getUsers(accountId)
            .subscribe(users => { this.users = users; },
            null,
            () => { this.usersLoading = false; });

        return user;
    }
}
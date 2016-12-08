import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';
import {UsersStore} from '../../../stores/users-store';
import {AccountDetail} from '../../../models/account-details';
import { Account } from '../../../models/account';

@Component({
    selector: 'users-list',
    templateUrl: 'templates/pages/users/users-list.html'
})


export class UsersListComponent implements OnInit {
    selectedUsers: any[];
    users: Account[];
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
    // deleteUser(user) {
    //     this._usersStore.deleteUser(user)
    //         .subscribe(users => { 
    //                 this.users.splice(this.users.indexOf(user), 1);
    //         });
    // }
    onRowSelect(user) {
        this._router.navigate(['/medical-provider/users/' + user.id + '/basic']);
    }
}
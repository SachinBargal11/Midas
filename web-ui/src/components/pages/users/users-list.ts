import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';
import {UsersService} from '../../../services/users-service';
import {ReversePipe} from '../../../pipes/reverse-array-pipe';
import {LimitPipe} from '../../../pipes/limit-array-pipe';
import {DataTable} from 'primeng/primeng';
import {UserDetail} from '../../../models/user-details';
import {AccountDetail} from '../../../models/account-details';
import {LoaderComponent} from '../../elements/loader';

@Component({
    selector: 'users-list',
    templateUrl: 'templates/pages/users/users-list.html',
    directives: [
        ROUTER_DIRECTIVES,
        LoaderComponent
    ],
    pipes: [ReversePipe, LimitPipe],
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

    }
}
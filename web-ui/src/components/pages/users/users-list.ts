import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';
import {UsersStore} from '../../../stores/users-store';
import {UsersService} from '../../../services/users-service';
import {ReversePipe} from '../../../pipes/reverse-array-pipe';
import {LimitPipe} from '../../../pipes/limit-array-pipe';
import {DataTable} from 'primeng/primeng';
import {UserDetail} from '../../../models/user-details';

@Component({
    selector: 'users-list',
    templateUrl: 'templates/pages/users/users-list.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    pipes: [ReversePipe, LimitPipe],
    providers: [UsersStore, UsersService]
})


export class UsersListComponent implements OnInit {
users: UserDetail[];
cols: any[];
    constructor(
        private _router: Router,
        private _usersStore: UsersStore,
        private _usersService: UsersService,
        private _sessionStore: SessionStore
    ) {
    }
    ngOnInit() {
        let accountId = this._sessionStore.session.account_id;
         let user = this._usersService.getUsers(accountId)
                                .subscribe(users => this.users = users);

    }
selectUser(user) {
        this._router.navigate(['/users/update/' + user.user.id]);
    }
}
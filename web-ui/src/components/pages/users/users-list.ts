import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UsersStore} from '../../../stores/users-store';
import {ReversePipe} from '../../../pipes/reverse-array-pipe';
import {LimitPipe} from '../../../pipes/limit-array-pipe';

@Component({
    selector: 'users-list',
    templateUrl: 'templates/pages/users/users-list.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    pipes: [ReversePipe, LimitPipe]
})


export class UsersListComponent implements OnInit {

    constructor(
        private _router: Router,
        private _usersStore: UsersStore
    ) {
    }

    ngOnInit() {

    }

}
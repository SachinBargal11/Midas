import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../stores/session-store';

@Component({
    selector: 'shell',
    template: `
    <router-outlet></router-outlet>
    `
})

export class ShellComponent implements OnInit {

    constructor(
        public router: Router,
        private _sessionStore: SessionStore
    ) {

    }

    ngOnInit() {

    }

}
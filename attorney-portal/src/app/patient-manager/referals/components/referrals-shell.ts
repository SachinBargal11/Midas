import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'referrals-shell',
    templateUrl: './referrals-shell.html'
})

export class ReferralsShellComponent implements OnInit {

    constructor(
        public _router: Router,
        public sessionStore: SessionStore
    ) {

    }

    ngOnInit() {

    }

}
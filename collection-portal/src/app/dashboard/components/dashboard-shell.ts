import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { SessionStore } from '../../commons/stores/session-store';


@Component({
    selector: 'dashboard-shell',
    templateUrl: './dashboard-shell.html'
})

export class DashboardShellComponent implements OnInit {

    constructor(
        public _router: Router,
        private _sessionStore: SessionStore,
        public _route: ActivatedRoute,
    ) {

    }

    ngOnInit() {

    }

}
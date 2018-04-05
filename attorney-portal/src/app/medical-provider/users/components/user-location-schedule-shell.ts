import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'user-schedule-shell',
    templateUrl: './user-location-schedule-shell.html'
})

export class UserLocationScheduleShellComponent implements OnInit {

    constructor(
        public router: Router,
        public _route: ActivatedRoute,
        private _sessionStore: SessionStore
    ) {

    }

    ngOnInit() {
    }

}
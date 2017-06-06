import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { SessionStore } from '../../commons/stores/session-store';


@Component({
    selector: 'event-shell',
    templateUrl: './event-shell.html'
})

export class EventShellComponent implements OnInit {

    constructor(
        public _router: Router,
        private _sessionStore: SessionStore,
        public _route: ActivatedRoute,
    ) {

    }

    ngOnInit() {

    }

}
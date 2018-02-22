import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'visit-shell',
    templateUrl: './visit-shell.html'
})

export class VisitShellComponent implements OnInit {

    test: boolean = true;
    constructor(
        public router: Router,
        public _route: ActivatedRoute,
        private _sessionStore: SessionStore
    ) {

    }

    ngOnInit() {
    }

}
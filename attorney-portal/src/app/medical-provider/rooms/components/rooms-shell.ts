import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'rooms-shell',
    templateUrl: './rooms-shell.html'
})

export class RoomsShellComponent implements OnInit {

    test: boolean = true;
    constructor(
        public router: Router,
        public _route: ActivatedRoute,
        private _sessionStore: SessionStore
    ) {

    }

    ngOnInit() {
        this._route.params.subscribe((routeParams: any) => {
            console.log(routeParams);
        });
    }

}
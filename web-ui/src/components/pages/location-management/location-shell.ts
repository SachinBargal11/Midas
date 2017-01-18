import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../stores/session-store';

@Component({
    selector: 'location-shell',
    templateUrl: 'templates/pages/location-management/location-shell.html'
})

export class LocationShellComponent implements OnInit {

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
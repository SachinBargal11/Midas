import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';

@Component({
    selector: 'locations',
    templateUrl: 'templates/pages/users/locations.html'
})


export class LocationsComponent implements OnInit {
    constructor(
        private _router: Router,
        private _sessionStore: SessionStore
    ) {
    }
    ngOnInit() {
    }
}
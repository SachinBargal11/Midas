import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';

@Component({
    selector: 'calendar',
    templateUrl: 'templates/pages/users/calendar.html'
})


export class CalendarComponent implements OnInit {
    constructor(
        private _router: Router,
        private _sessionStore: SessionStore
    ) {
    }
    ngOnInit() {
    }
}
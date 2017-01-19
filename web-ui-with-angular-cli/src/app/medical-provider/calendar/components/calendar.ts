import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../../commons/stores/session-store';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html'
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
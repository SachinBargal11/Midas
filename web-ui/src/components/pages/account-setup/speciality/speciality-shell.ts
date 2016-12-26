import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../../../stores/session-store';

@Component({
    selector: 'speciality-shell',
    templateUrl: 'templates/pages/account-setup/speciality/speciality-shell.html'
})

export class SpecialityShellComponent implements OnInit {

    constructor(
        public router: Router,
        private _sessionStore: SessionStore
    ) {

    }

    ngOnInit() {

    }

}
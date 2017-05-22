import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../commons/stores/session-store';

@Component({
    selector: 'medical-provider-shell',
    templateUrl: './medical-provider-shell.html'
})

export class MedicalProviderShellComponent implements OnInit {

    constructor(
        public router: Router,
        private _sessionStore: SessionStore
    ) {

    }

    ngOnInit() {

    }

}
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStore} from '../../../commons/stores/session-store';

@Component({
    selector: 'speciality-shell',
    templateUrl: './speciality-shell.html'
})

export class SpecialityShellComponent implements OnInit {

    constructor(
        public _router: Router,
        private _sessionStore: SessionStore
    ) {
         this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/account-setup/specialities']); ;
        });

    }

    ngOnInit() {

    }

}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'patient-nav',
    templateUrl: './nav-bar.html'
})

export class PatientNavComponent {
    patientId: number;
    constructor(
        private _router: Router,
        private _sessionStore: SessionStore
        ) {
            this.patientId = this._sessionStore.session.user.id;
    }
    hideLeftMobileMenu() {
        document.getElementsByTagName('body')[0].classList.remove('menu-left-opened');
        document.getElementsByClassName('hamburger')[0].classList.remove('is-active');
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }

}


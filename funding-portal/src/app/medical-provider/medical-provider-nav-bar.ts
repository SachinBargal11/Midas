import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'medical-provider-nav',
    templateUrl: './nav-bar.html'
})

export class MedicalProviderNavComponent {
    constructor(private _router: Router) {
    }
    hideLeftMobileMenu() {
        document.getElementsByTagName('body')[0].classList.remove('menu-left-opened');
        document.getElementsByClassName('hamburger')[0].classList.remove('is-active');
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }

}


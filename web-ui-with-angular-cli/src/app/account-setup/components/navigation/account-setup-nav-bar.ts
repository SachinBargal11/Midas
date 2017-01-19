import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'account-setup-nav',
    templateUrl: './nav-bar.html'
})

export class AccountSetupNavComponent {
    constructor(private _router: Router) {
    }

}


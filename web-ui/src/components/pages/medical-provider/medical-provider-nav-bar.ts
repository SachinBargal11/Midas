import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'medical-provider-nav',
    templateUrl: 'templates/pages/medical-provider/nav-bar.html'
})

export class MedicalProviderNavComponent {
    constructor(private _router: Router) {
    }

}


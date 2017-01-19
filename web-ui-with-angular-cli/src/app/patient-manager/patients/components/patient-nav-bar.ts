import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'patient-nav',
    templateUrl: './nav-bar.html'
})

export class PatientNavComponent {
    constructor(private _router: Router) {
    }

}


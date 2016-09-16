import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'main-nav',
    templateUrl: 'templates/elements/main-nav.html'
})

export class MainNavComponent {
    constructor(private _router: Router) {
    }

    isCurrentRoute(route) {
        // var instruction = this._router.generate(route);
        // return this._router.isRouteActive(instruction);
    }
}


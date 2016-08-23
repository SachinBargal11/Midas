import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
    selector: 'main-nav',
    templateUrl: 'templates/elements/main-nav.html',
    // directives: [ROUTER_DIRECTIVES]
})

export class MainNavComponent {
    constructor(private _router: Router) {
    }

    isCurrentRoute(route) {
        // var instruction = this._router.generate(route);
        // return this._router.isRouteActive(instruction);
    }
}


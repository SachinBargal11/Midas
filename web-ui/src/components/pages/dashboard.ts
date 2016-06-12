import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteParams} from '@angular/router-deprecated';

@Component({
    selector: 'dashboard',
    templateUrl: 'templates/pages/dashboard.html',
    directives: [ROUTER_DIRECTIVES]
})

export class DashboardComponent {
        
    constructor(
        private _router: Router,
        private _routeParams: RouteParams
    ) {

    }
}
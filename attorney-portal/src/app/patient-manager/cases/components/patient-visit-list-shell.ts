import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'patient-visit-list-shell',
    templateUrl: './patient-visit-list-shell.html'
})

export class PatientVisitListShellComponent implements OnInit {

    test: boolean = true;
    constructor(
        public router: Router,
        public _route: ActivatedRoute,
        private _sessionStore: SessionStore
    ) {

    }

    ngOnInit() {
        // this._route.params.subscribe((routeParams: any) => {
        //     console.log(routeParams);
        // });
    }

}
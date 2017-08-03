import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../commons/stores/session-store';

@Component({
    selector: 'user-settings-shell',
    templateUrl: './user-settings-shell.html'
})

export class UserSettingsShellComponent implements OnInit {

    test: boolean = true;
    constructor(

        public _router: Router,
        public _route: ActivatedRoute,
        private _sessionStore: SessionStore,
       
        
    ) {
    //    this._sessionStore.userCompanyChangeEvent.subscribe(() => {
    //         this._router.navigate(['/dashboard']);
    //     });
    }

    ngOnInit() {
        this._route.params.subscribe((routeParams: any) => {
            console.log(routeParams);
        });
    }

}
import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import {SessionStore} from '../stores/session-store';


@Injectable()
export class ValidateActiveSession implements CanActivate {
    constructor(public sessionStore: SessionStore, private _router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.sessionStore.session.isAuthenticated) {
            return true;
        }

        // this._router.navigate(['/account/login']);
        this.sessionStore.logout();
        return false;
    }
}
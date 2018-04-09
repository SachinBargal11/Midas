import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import * as moment from 'moment';

import { SessionStore } from '../stores/session-store';


@Injectable()
export class ValidateActiveSession implements CanActivate {
    constructor(public sessionStore: SessionStore, private _router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.sessionStore.session.isAuthenticated) {
            return true;
        } else {
            let now = moment();
            // if (this.sessionStore.session.account) {
            //     // this._router.navigate(['/account/login']);
            //     this.sessionStore.logout();
            //     return false;
            // } else 
            if (this.sessionStore.session.account && this.sessionStore.session.tokenExpiresAt < now) {
                this.sessionStore.refreshToken();
                return false;
            } else {
                return false;
            }
        }
    }
}
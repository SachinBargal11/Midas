import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import * as _ from 'underscore';

import { SessionStore } from '../stores/session-store';


@Injectable()
export class ValidateInActiveDoctorSession implements CanActivate {
    constructor(private _sessionStore: SessionStore, private _router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (this._sessionStore.session.isAuthenticated) {
        //     return true;
        // }
        let roles = this._sessionStore.session.user.roles;
        if (roles) {
            let withoutDoctorRole;
            if (roles.length === 1) {
                withoutDoctorRole = _.find(roles, (currentRole) => {
                    return currentRole.roleType !== 3;
                });
            }
            if (withoutDoctorRole) {
                return true;
            }
        return false;
        }

        // this._router.navigate(['/account/login']);
    }
}

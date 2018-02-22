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
export class ValidateDoctorSession implements CanActivate {
    constructor(private _sessionStore: SessionStore, private _router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (this._sessionStore.session.isAuthenticated) {
        //     return true;
        // }
        let roles = this._sessionStore.session.user.roles;
        if (roles) {
            let doctorRoleOnly;
            if (roles.length === 1) {
                doctorRoleOnly = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
            }
            if (doctorRoleOnly) {
                return true;
            }
        this._router.navigate(['/patient-manager/patients']);
        return false;
        }

    }
}
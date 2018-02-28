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
            else if (roles.length > 1) {
                let count = 0;
                let currentcompanyrole = 0;
                _.forEach(roles, (currentRole) => {
                   if(currentRole.companyId == this._sessionStore.session.currentCompany.id)
                   {
                      if(currentRole.roleType === 3)
                      {
                        count = count + 1;
                        currentcompanyrole = currentRole.roleType;
                      }
                      if(currentRole.roleType === 1)
                      {
                        count = count + 1;
                        currentcompanyrole = currentRole.roleType;
                      }
                   }
                });
                if(count > 1)
                {
                    doctorRoleOnly = true;
                }
                else{
                    if(currentcompanyrole == 3)
                    {
                        doctorRoleOnly = true;
                    }
                    else{
                        doctorRoleOnly = false;
                    }
                 }
                }
                 
            if (doctorRoleOnly) {
                return true;
            }
        this._router.navigate(['/patient-manager/patients']);
        return false;
        }

    }
}
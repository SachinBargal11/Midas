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
export class ValidateAttorneySession implements CanActivate {
    constructor(private _sessionStore: SessionStore, private _router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (this._sessionStore.session.isAuthenticated) {
        //     return true;
        // }
        let roles = this._sessionStore.session.user.roles;
        if (roles) {
            let attorneyRoleOnly;
            if (roles.length === 1) {
                attorneyRoleOnly = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 6;
                });
            }
            else if (roles.length > 1) {
                let count = 0;
                let currentcompanyrole = 0;
                _.forEach(roles, (currentRole) => {
                   if(currentRole.companyId == this._sessionStore.session.currentCompany.id)
                   {
                      if(currentRole.roleType === 6)
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
                    attorneyRoleOnly = true;
                }
                else{
                    if(currentcompanyrole == 3)
                    {
                        attorneyRoleOnly = true;
                    }
                    else{
                        attorneyRoleOnly = false;
                    }
                 }
                }
                 
            if (attorneyRoleOnly) {
                return true;
            }
        this._router.navigate(['/patient-manager/patients']);
        return false;
        }

    }
}
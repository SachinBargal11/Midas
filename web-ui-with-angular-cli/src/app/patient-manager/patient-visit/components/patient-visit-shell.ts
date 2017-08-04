import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import * as _ from 'underscore';

@Component({
    selector: 'patient-visit-shell',
    templateUrl: './patient-visit-shell.html'
})

export class PatientVisitShellComponent implements OnInit {
    doctorRoleFlag = false;

    constructor(
        public _router: Router,
        public _sessionStore: SessionStore,
        public sessionStore: SessionStore,

    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/patient-manager/patient-visit']);;
        });
    }

    ngOnInit() {
        let doctorRolewithOther;
        let doctorRolewithoutOther;
         let roles = this.sessionStore.session.user.roles;
        if (roles) {
            if (roles.length === 1) {
                doctorRolewithoutOther = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
            } else if (roles.length > 1) {
                doctorRolewithOther = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
            }
            if (doctorRolewithoutOther) {
                this.doctorRoleFlag = true;
            } else if (doctorRolewithOther) {
                this.doctorRoleFlag = false;
            } else {
                this.doctorRoleFlag = false;
            }
        }
    }

}
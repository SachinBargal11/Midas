import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'patient-nav',
    templateUrl: './nav-bar.html'
})

export class PatientNavComponent implements OnInit {
    doctorFlag = false;
    constructor(
        private _router: Router,
        public sessionStore: SessionStore,

    ) {
    }

    ngOnInit() {
         this.CheckingDoctor();
    }

       CheckingDoctor() {
        let doctorRoleOnly = null;
        let roles = this.sessionStore.session.user.roles;
        if (roles) {
            if (roles.length === 1) {
                doctorRoleOnly = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
            }
            else if (roles.length > 1) {
                let count = 0;
                let currentcompanyrole = 0;
                _.forEach(roles, (currentRole) => {
                   if(currentRole.companyId == this.sessionStore.session.currentCompany.id)
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
            if (doctorRoleOnly) {
                // this.loadPatientsByCompanyAndDoctor();
                this.doctorFlag = true;
            } else {
                this.doctorFlag = false;
            }
        }
    }
}


    hideLeftMobileMenu() {
        document.getElementsByTagName('body')[0].classList.remove('menu-left-opened');
        document.getElementsByClassName('hamburger')[0].classList.remove('is-active');
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }

}


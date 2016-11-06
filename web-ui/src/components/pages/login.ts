import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppValidators } from '../../utils/AppValidators';
import { NotificationsService } from 'angular2-notifications';
import { Session } from '../../models/session';
import { SessionStore } from '../../stores/session-store';
import { AuthenticationService } from '../../services/authentication-service';

@Component({
    selector: 'login',
    templateUrl: 'templates/pages/login.html',
    providers: [NotificationsService, FormBuilder]
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFormControls;
    isLoginInProgress;
    options = {
        timeOut: 50000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false
    };
    constructor(
        private fb: FormBuilder,
        private _sessionStore: SessionStore,
        private _notificationsService: NotificationsService,
        private _authenticationService: AuthenticationService,
        private _router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, AppValidators.emailValidator]],
            password: ['', Validators.required],
        });
        this.loginFormControls = this.loginForm.controls;
    }

    ngOnInit() {

    }

    checkSecuredLogin(email) {
        if (!window.localStorage.getItem('device_verified_for' + email)) {
            return true;
        }
        return false;
    }

    login() {
        let result;
        this.isLoginInProgress = true;
        let forceLogin = true;
        if (this.checkSecuredLogin(this.loginForm.value.email)) {
            forceLogin = false;
        }
        result = this._sessionStore.login(this.loginForm.value.email, this.loginForm.value.password, forceLogin);

        result.subscribe(
            (session: Session) => {
                debugger;
                if (this.checkSecuredLogin(this.loginForm.value.email)) {
                    this._router.navigate(['/login/security-check']);
                } else {
                    this._router.navigate(['/dashboard']);
                }
            },
            (error: Error) => {
                this.isLoginInProgress = false;
                this._notificationsService.error('Oh No!', 'Unable to authenticate user.');
            },
            () => {
                this.isLoginInProgress = false;
            });
    }
}
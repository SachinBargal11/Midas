import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppValidators } from '../../commons/utils/AppValidators';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { NotificationsService } from 'angular2-notifications';
import { Session } from '../../commons/models/session';
import { SessionStore } from '../../commons/stores/session-store';
import { AuthenticationService } from '../services/authentication-service';

@Component({
    selector: 'login',
    templateUrl: './login.html'
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
                if (this.checkSecuredLogin(this.loginForm.value.email)) {
                    this._router.navigate(['/account/security-check']);
                } else {
                    // this._router.navigate(['/patient-manager/patients']);
                    this._router.navigate(['/dashboard']);
                }
            },
            (error: Error) => {
                this.isLoginInProgress = false;
                let errString = 'Unable to authenticate user.';
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this.isLoginInProgress = false;
            });
    }
}
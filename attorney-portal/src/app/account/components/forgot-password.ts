import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { AppValidators } from '../../commons/utils/AppValidators';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { AuthenticationService } from '../services/authentication-service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.html'
})

export class ForgotPasswordComponent implements OnInit {
    isTokenValidated: boolean = false;
    isTokenValid: boolean = false;
    token: any;
    user: any;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    forgotPasswordForm: FormGroup;
    forgotPasswordFormControls;
    isForgotPasswordInProgress;
    constructor(
        private location: Location,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _notificationsService: NotificationsService
    ) {
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required, AppValidators.emailValidator]],
        });

        this.forgotPasswordFormControls = this.forgotPasswordForm.controls;
    }

    ngOnInit() {
    }

    checkUser() {
        let requestData = {
            userName: this.forgotPasswordForm.value.email
        };
        this.isForgotPasswordInProgress = true;

        this._authenticationService.GeneratePasswordResetLink(requestData)
            .subscribe(
            (response) => {
                this._notificationsService.success('Success', 'Check your email to change your password.');
                setTimeout(() => {
                    // this._router.navigate(['/account/login']);
                    window.location.assign(environment.HOME_URL);
                }, 3000);
            },
            error => {
                this.isForgotPasswordInProgress = false;
                let errString = 'Sorry! User does not exist!';
                this._notificationsService.error('Error!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this.isForgotPasswordInProgress = false;
            });
    }

    goBack(): void {
        // this.location.back();
        // this._router.navigate(['/account/login']);
        window.location.assign(environment.HOME_URL);
    }

}
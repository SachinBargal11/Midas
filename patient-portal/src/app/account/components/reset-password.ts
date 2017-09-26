import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../commons/utils/AppValidators';
import { AuthenticationService } from '../services/authentication-service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.html'
})

export class ResetPasswordComponent implements OnInit {
    isTokenValidated: boolean = false;
    isTokenValid: boolean = false;
    user: any;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    resetPasswordForm: FormGroup;
    resetPasswordFormControls;
    isResetPasswordInProgress;
    constructor(
        private location: Location,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _notificationsService: NotificationsService
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let token = routeParams.token;
            let autheticateRequestData = {
                appKey: token
            };
            let result = this._authenticationService.checkForValidResetPasswordToken(autheticateRequestData);
            result.subscribe(
                (data: any) => {
                    // check for response
                    this.isTokenValidated = true;
                    this.isTokenValid = true;
                    this.user = data;
                },
                (error) => {
                    this.isTokenValidated = true;
                },
                () => {
                });
        });


        this.resetPasswordForm = this.fb.group({
            password: ['', [Validators.required, Validators.maxLength(20), AppValidators.passwordValidator]],
            confirmPassword: ['', Validators.required]
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });

        this.resetPasswordFormControls = this.resetPasswordForm.controls;
    }

    ngOnInit() {

    }

    updatePassword() {
        let requestData = { user: null };
        requestData.user = {
            id: this.user.id,
            userName: this.user.userName,
            password: this.resetPasswordForm.value.password
        };
        this.isResetPasswordInProgress = true;

        this._authenticationService.updatePassword(requestData)
            .subscribe(
            (response) => {
                this._notificationsService.success('Success', 'Your password has been set successfully!');
                setTimeout(() => {
                    // this._router.navigate(['/account/login']);
                    window.location.assign(environment.HOME_URL);
                }, 3000);
            },
            error => {
                this.isResetPasswordInProgress = false;
                let errString = 'Unable to set your password.';
                this._notificationsService.error('Error!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this.isResetPasswordInProgress = false;
            });
    }

    goBack(): void {
        // this.location.back();
        // this._router.navigate(['/account/login']);
        window.location.assign(environment.HOME_URL);
    }

}
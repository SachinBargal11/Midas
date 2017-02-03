import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../commons/utils/AppValidators';
import { NotificationsService } from 'angular2-notifications';

import { AuthenticationService } from '../services/authentication-service';

@Component({
    selector: 'account-activation',
    templateUrl: './account-activation.html'
})

export class AccountActivationComponent implements OnInit {
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
    changePassForm: FormGroup;
    changePassFormControls;
    isPassChangeInProgress;
    constructor(
        private location: Location,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _notificationsService: NotificationsService
    ) {
        this._route.params.subscribe((routeParams: any) => {
            this.token = routeParams.token;
            let result = this._authenticationService.checkForValidToken(this.token);
            result.subscribe(
                (data: any) => {
                    // check for response
                    this.isTokenValidated = true;
                    this.isTokenValid = true;
                    this.user = data.user;
                },
                (error) => {
                    this.isTokenValidated = true;
                    // this._notificationsService.error('Error!', 'Activation code is invalid.');
                    // setTimeout(() => {
                    //     this._router.navigate(['/account/login']);
                    // }, 3000);
                },
                () => {
                });
        });


        this.changePassForm = this.fb.group({
            password: ['', [Validators.required, Validators.maxLength(20), AppValidators.passwordValidator]],
            confirmPassword: ['', Validators.required]
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });

        this.changePassFormControls = this.changePassForm.controls;
    }

    ngOnInit() {
    }

    updatePassword() {
        let requestData = { user: null };
        requestData.user = {
            id: this.user.id,
            userName: this.user.userName,
            password: this.changePassForm.value.password
        };
        this.isPassChangeInProgress = true;

        this._authenticationService.updatePassword(requestData)
            .subscribe(
            (response) => {
                this._notificationsService.success('Success', 'Your password has been set successfully!');
                setTimeout(() => {
                    this._router.navigate(['/account/login']);
                }, 3000);
            },
            error => {
                this.isPassChangeInProgress = false;
                let errString = 'Unable to set your password.';
                this._notificationsService.error('Error!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this.isPassChangeInProgress = false;
            });
    }

    goBack(): void {
        // this.location.back();
        this._router.navigate(['/account/login']);
    }

}
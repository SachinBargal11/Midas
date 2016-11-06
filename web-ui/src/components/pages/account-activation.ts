import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidators } from '../../utils/AppValidators';
import { NotificationsService } from 'angular2-notifications';

import { AuthenticationService } from '../../services/authentication-service';
import { UsersService } from '../../services/users-service';

@Component({
    selector: 'account-activation',
    templateUrl: 'templates/pages/account-activation.html',
    providers: [FormBuilder, AuthenticationService, NotificationsService]
})

export class AccountActivationComponent implements OnInit {
    token: any;
    user: any;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
        // maxLength: 10
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
        private _notificationsService: NotificationsService,
        private _usersService: UsersService
    ) {
        this._route.params.subscribe((routeParams: any) => {
            this.token = routeParams.token;
            let result = this._authenticationService.checkForValidToken(this.token);
            result.subscribe(
                (data: any) => {
                    // check for response
                    this.user = data.user;
                },
                (error) => {
                    this._notificationsService.error('Error!', 'Activation code is invalid.');
                    setTimeout(() => {
                        // this._router.navigate(['/login']);
                    }, 3000);
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
        let userDetail = ({
            user: {
                id: this.user.id,
                password: this.changePassForm.value.password
            }
        });


        this.isPassChangeInProgress = true;

        this._authenticationService.updatePassword(userDetail)
            .subscribe(
            (response) => {
                this._notificationsService.success('Success', 'Your password has been set successfully!');
                setTimeout(() => {
                    this._router.navigate(['/login']);
                }, 3000);
            },
            error => {
                this._notificationsService.error('Error!', 'Unable to set your password.');
            },
            () => {
                this.isPassChangeInProgress = false;
            });
    }

    goBack(): void {
        // this.location.back();
        this._router.navigate(['/login']);
    }

}
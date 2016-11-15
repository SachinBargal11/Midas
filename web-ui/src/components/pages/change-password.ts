import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidators } from '../../utils/AppValidators';
import { NotificationsService } from 'angular2-notifications';
import { UsersStore } from '../../stores/users-store';
import { UsersService } from '../../services/users-service';
import { SessionStore } from '../../stores/session-store';
import { AuthenticationService } from '../../services/authentication-service';

@Component({
    selector: 'change-password',
    templateUrl: 'templates/pages/change-password.html',
    providers: [FormBuilder, AuthenticationService, NotificationsService]
})

export class ChangePasswordComponent implements OnInit {
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
        private _usersStore: UsersStore,
        private _usersService: UsersService,
        private _authenticationService: AuthenticationService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore
    ) {
        this.changePassForm = this.fb.group({
            oldpassword: ['', Validators.required],
            password: ['', [Validators.required, Validators.maxLength(20), AppValidators.passwordValidator]],
            confirmPassword: ['', Validators.required]
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });

        this.changePassFormControls = this.changePassForm.controls;
    }

    ngOnInit() {
    }

    updatePassword() {
        let userId: number = this._sessionStore.session.user.id;
        let userDetail = ({
            user: {
                id: userId,
                password: this.changePassForm.value.password
            }
        });

        this.isPassChangeInProgress = true;
        let userName = this._sessionStore.session.user.userName;
        let oldpassword = this.changePassForm.value.oldpassword;

        let result = this._authenticationService.authenticate(userName, oldpassword, true);
        result.subscribe(
            (response) => {
                this._authenticationService.updatePassword(userDetail)
                    .subscribe(
                    (response) => {
                        this._notificationsService.success('Success', 'Password changed successfully!');
                        setTimeout(() => {
                            this._router.navigate(['/dashboard']);
                        }, 3000);
                    },
                    error => {
                        this._notificationsService.error('Error!', 'Unable to change your password.');
                    },
                    () => {
                        this.isPassChangeInProgress = false;
                    });
            },
            error => {
                this._notificationsService.error('Error!', 'Please enter old password correctly.');
            },
            () => {
                this.isPassChangeInProgress = false;
            });
    }

    goBack(): void {
        this._router.navigate(['/dashboard']);
        // this.location.back();
    }

}
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../utils/ErrorMessageFormatter';
import { AppValidators } from '../../utils/AppValidators';
import { NotificationsService } from 'angular2-notifications';
import { UsersStore } from '../../stores/users-store';
import { UsersService } from '../../services/users-service';
import { SessionStore } from '../../stores/session-store';
import { AuthenticationService } from '../../services/authentication-service';
import { ProgressBarService } from '../../services/progress-bar-service';
import { NotificationsStore } from '../../stores/notifications-store';
import { Notification } from '../../models/notification';
import moment from 'moment';

@Component({
    selector: 'change-password',
    templateUrl: 'templates/pages/change-password.html'
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
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
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

        this._progressBarService.show();
        this.isPassChangeInProgress = true;
        let userName = this._sessionStore.session.user.userName;
        let oldpassword = this.changePassForm.value.oldpassword;

        let result = this._authenticationService.authenticate(userName, oldpassword, true);
        result.subscribe(
            (response) => {
                this._authenticationService.updatePassword(userDetail)
                    .subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Password changed successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this._router.navigate(['/dashboard']);
                    },
                    error => {
                        this.isPassChangeInProgress = false;
                        let errString = 'Unable to change your password.';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this._progressBarService.hide();
                    },
                    () => {
                        this.isPassChangeInProgress = false;
                        this._progressBarService.hide();
                    });
            },
            error => {
                this.isPassChangeInProgress = false;
                let errString = 'Please enter old password correctly.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this.isPassChangeInProgress = false;
                this._progressBarService.hide();
            });
    }

    goBack(): void {
        this._router.navigate(['/dashboard']);
        // this.location.back();
    }

}
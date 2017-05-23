import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../commons/utils/AppValidators';
import { NotificationsService } from 'angular2-notifications';
import { SessionStore } from '../../commons/stores/session-store';
import { AuthenticationService } from '../services/authentication-service';
import { ProgressBarService } from '../../commons/services/progress-bar-service';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import { Notification } from '../../commons/models/notification';
import * as moment from 'moment';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.html'
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
                        this._notificationsService.error('Error!', ErrorMessageFormatter.getErrorMessages(error, errString));
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
                this._notificationsService.error('Error!', ErrorMessageFormatter.getErrorMessages(error, errString));
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
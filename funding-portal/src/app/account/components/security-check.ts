import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { AuthenticationService } from '../services/authentication-service';
import { SessionStore } from '../../commons/stores/session-store';
import { AccountAdapter } from '../services/adapters/account-adapter';
import { Account } from '../models/account';

@Component({
    selector: 'security-check',
    templateUrl: './security-check.html'
})

export class SecurityCheckComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };

    securityCheckForm: FormGroup;
    securityCheckFormControls;
    isSecurityCheckInProgress;
    isRegenrateCodeInProgress;
    referenceNumber;

    constructor(
        private location: Location,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _sessionStore: SessionStore,
        private _notificationsService: NotificationsService
    ) {
        this.referenceNumber = window.sessionStorage.getItem('pin');
        this.securityCheckForm = this.fb.group({
            code: ['', Validators.required],
        });

        this.securityCheckFormControls = this.securityCheckForm.controls;
    }

    validateSecurityCode() {
        let securityCheckFormControlsValues = this.securityCheckForm.value;
        this.isSecurityCheckInProgress = true;
        let result = this._sessionStore.verifyLoginDevice(securityCheckFormControlsValues.code);
        result.subscribe(
            (response) => {
                this._router.navigate(['/dashboard/funding-receivable']);
            },
            (error) => {
                this.isSecurityCheckInProgress = false;
                let errString = 'Unable to verify security code.';
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this.isSecurityCheckInProgress = false;
            });
    }

    regenrateCode() {
        let storedAccountData: any = JSON.parse(window.sessionStorage.getItem('logged_user_with_pending_security_review'));
        let account: Account = AccountAdapter.parseStoredData(storedAccountData);

        this.isRegenrateCodeInProgress = true;
        let result = this._authenticationService.generateCode(account.user.id);
        result.subscribe(
            (response) => {
                this.referenceNumber = window.sessionStorage.getItem('pin');
                this._notificationsService.success('Success!', 'Please check your email for regenerated security code!');
            },
            (error) => {
                this.isRegenrateCodeInProgress = false;
                let errString = 'Unable to regenerate security code.';
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this.isRegenrateCodeInProgress = false;
            });
    }

    ngOnInit() {
    }

    goBack(): void {
        // this.location.back();
        this._router.navigate(['/account/login']);
    }
}
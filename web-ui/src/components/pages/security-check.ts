import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthenticationService } from '../../services/authentication-service';
import { SessionStore } from '../../stores/session-store';
import { User } from '../../models/user';

@Component({
    selector: 'security-check',
    templateUrl: 'templates/pages/security-check.html'
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

    constructor(
        private location: Location,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _sessionStore: SessionStore,
        private _notificationsService: NotificationsService
    ) {

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
                this._router.navigate(['/dashboard']);
            },
            (error) => {
                this.isSecurityCheckInProgress = false;
                this._notificationsService.error('Oh No!', 'Unable to verify security code.');
            },
            () => {
                this.isSecurityCheckInProgress = false;
            });
    }

    regenrateCode() {
        debugger;
        let user: User = new User(JSON.parse(window.sessionStorage.getItem('logged_user_with_pending_security_review')));
        this.isRegenrateCodeInProgress = true;
        let result = this._authenticationService.generateCode(user.id);
        result.subscribe(
            (response) => {
                this._notificationsService.success('Success!', 'Please check your email for regenerated security code!');
            },
            (error) => {
                this.isRegenrateCodeInProgress = false;
                this._notificationsService.error('Oh No!', 'Unable to regenerate security code.');
            },
            () => {
                this.isRegenrateCodeInProgress = false;
            });
    }

    ngOnInit() {
    }

    goBack(): void {
        // this.location.back();
        this._router.navigate(['/login']);
    }
}
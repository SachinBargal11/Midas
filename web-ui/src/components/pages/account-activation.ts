import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidators } from '../../utils/AppValidators';
import { NotificationsService } from 'angular2-notifications';

import { AuthenticationService } from '../../services/authentication-service';

@Component({
    selector: 'account-activation',
    templateUrl: 'templates/pages/account-activation.html',
    providers: [FormBuilder, AuthenticationService, NotificationsService]
})

export class AccountActivationComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
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
        debugger;
        this._route.params.subscribe((routeParams: any) => {
            debugger;
            let token: number = parseInt(routeParams.token);
            let result = this._authenticationService.checkForValidToken(token);
            result.subscribe(
                (response) => {
                    // check for response
                },
                (error) => {
                    // this._router.navigate(['/login']);
                },
                () => {
                });
        });


        this.changePassForm = this.fb.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });

        this.changePassFormControls = this.changePassForm.controls;
    }

    ngOnInit() {
    }

    updatePassword() {
        
    }

    goBack(): void {
        this.location.back();
    }

}
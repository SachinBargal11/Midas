import {Component, OnInit} from '@angular/core';
import {ControlGroup, Validators, FormBuilder} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, RouteParams} from '@angular/router-deprecated';
import {AppValidators} from '../../utils/AppValidators';
import {LoaderComponent} from '../elements/loader';
import {AuthenticationService} from '../../services/authentication-service';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';
import {SessionStore} from '../../stores/session-store';

@Component({
    selector: 'signup',
    templateUrl: 'templates/pages/signup.html',
    directives: [ROUTER_DIRECTIVES, LoaderComponent, SimpleNotificationsComponent],
    providers: [AuthenticationService, NotificationsService]
})

export class SignupComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    signupForm: ControlGroup;
    isSignupInProgress;
    constructor(
        fb: FormBuilder,
        private _authenticationService: AuthenticationService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _router: Router,
        private _routeParams: RouteParams
    ) {
        this.signupForm = fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, AppValidators.emailValidator])],
            mobileNo: ['', Validators.compose([Validators.required, AppValidators.mobileNoValidator])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });
    }

    ngOnInit() {
        if (this._sessionStore.isAuthenticated()) {
            this._router.navigate(['Dashboard']);
        }
    }

    register() {
        this.isSignupInProgress = true;
        var result;
        var user = {
            'name': this.signupForm.value.name,
            'email': this.signupForm.value.email,
            'mobileNo': this.signupForm.value.mobileNo,
            'password': this.signupForm.value.password
        }
        result = this._authenticationService.register(user);


        result.subscribe(
            (response) => {
                this._notificationsService.success('Welcome!', 'You have suceessfully registered!');
                setTimeout(() => {
                    this._router.navigate(['Login']);
                }, 3000);
            },
            error => {
                this._notificationsService.error('Oh No!', 'Unable to register user.');
                // alert("Unable to register");
            },
            () => {
                this.isSignupInProgress = false;
            });
    }

}
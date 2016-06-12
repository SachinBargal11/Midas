import {Component, OnInit} from '@angular/core';
import {ControlGroup, Validators, FormBuilder} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, RouteParams} from '@angular/router-deprecated';
import {AppValidators} from '../../utils/AppValidators';
import {LoaderComponent} from '../elements/loader';
import {AuthenticationService} from '../../services/authentication';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'login',
    templateUrl: 'templates/pages/login.html',
    directives: [ROUTER_DIRECTIVES, LoaderComponent, SimpleNotificationsComponent],
    providers: [AuthenticationService, NotificationsService]
})

export class LoginComponent implements OnInit {
    loginForm: ControlGroup;
    isLoginInProgress;
    options = {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    constructor(
        fb: FormBuilder,
        private _authenticationService: AuthenticationService,
        private _notificationsService: NotificationsService,
        private _router: Router,
        private _routeParams: RouteParams
    ) {
        this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, AppValidators.emailValidator])],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {
        if (window.localStorage.hasOwnProperty('session_user_name')) {
            this._router.navigate(['Dashboard']);
        }
    }

    login() {
        var result;
        this.isLoginInProgress = true;
        var getParam = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        }
        result = this._authenticationService.authenticate(getParam);

        result.subscribe(
            response => {
                if (response.length) {
                    window.localStorage.setItem('session_user_name', response[0].name);
                    this._router.navigate(['Dashboard']);
                } else {
                    this._notificationsService.error('Oh No!', 'Invalid username and password.');
                }
            },
            error => {
                this._notificationsService.error('Oh No!', 'Unable to authenticate user.');
            },
            () => {
                this.isLoginInProgress = false;
            });
    }
}